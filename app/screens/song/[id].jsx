import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Feather } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "../../../src/context/ThemeContext";
import { GetSong, streamSong } from "../../../src/utils/subsonic/songs";

const { width } = Dimensions.get("window");

export default function Song() {
  const [song, setSong] = useState(null);
  const [sound, setSound] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const { id, cover } = useLocalSearchParams();
  const { style } = useTheme();

  const scrollAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchSong = async () => {
      const songDetails = await GetSong(id);
      if (songDetails) {
        setSong(songDetails);
        setDuration(songDetails.duration || 0);
        const uri = await streamSong(id);
        const { sound: playbackObject } = await Audio.Sound.createAsync(
          { uri: uri },
          { shouldPlay: false }
        );
        setSound(playbackObject);
      }
    };
    fetchSong();
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [id]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (isPlaying && sound) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded && status.positionMillis) {
          setCurrentTime(Math.floor(status.positionMillis / 1000));
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, sound]);

  const togglePlayPause = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      console.log(status)
      if (status.isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const handleSliderChange = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value * 1000);
      setCurrentTime(value);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const startTitleAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scrollAnim, {
          toValue: -containerWidth,
          duration: 8000,
          useNativeDriver: true,
        }),
        Animated.timing(scrollAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    if (song && containerWidth && song.title.length * 12 > containerWidth) {
      // Inicia la animación solo si el título es más grande que el contenedor
      startTitleAnimation();
    }
  }, [song, containerWidth]);

  const onTitleLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  if (!song) {
    return (
      <View style={[styles.container, { backgroundColor: style.background }]}>
        <Text style={styles.text}>Cargando canción...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: style.background }]}>
      <Image source={{ uri: cover }} style={styles.cover} />
      <View style={styles.titleContainer} onLayout={onTitleLayout}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Animated.Text
            style={[
              styles.title,
              { transform: [{ translateX: scrollAnim }] },
              { color: style.text },
            ]}
            numberOfLines={1}
          >
            {song.title}
          </Animated.Text>
        </ScrollView>
      </View>
      <Text style={[styles.artist, { color: style.text }]}>{song.artist}</Text>
      <View style={styles.controls}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor={style.accent}
          maximumTrackTintColor="#8A8A8A"
          thumbTintColor="#FFFFFF"
          value={currentTime}
          onSlidingComplete={handleSliderChange}
        />
        <View style={styles.timeContainer}>
          <Text style={[styles.timeText, { color: style.secondaryText }]}>{formatTime(currentTime)}</Text>
          <Text style={[styles.timeText, { color: style.secondaryText }]}>{formatTime(duration)}</Text>
        </View>
      </View>
      <Text style={[styles.details, { color: style.text }]}>
        {song.suffix} - {song.bitRate}kbps
      </Text>
      <View style={styles.controlButtons}>
        <Pressable>
          <Feather name="shuffle" size={24} color="#FFFFFF" />
        </Pressable>
        <Pressable>
          <Feather name="skip-back" size={32} color="#FFFFFF" />
        </Pressable>
        <Pressable onPress={() => togglePlayPause()}>
          <Feather
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={48}
            color="#FFFFFF"
          />
        </Pressable>
        <Pressable>
          <Feather name="skip-forward" size={32} color="#FFFFFF" />
        </Pressable>
        <Pressable>
          <Feather name="repeat" size={24} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  cover: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
  },
  titleContainer: {
    width: "90%",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: "JetBrainsMono-Bold",
    overflow: "hidden",
  },
  artist: {
    fontSize: 18,
    fontFamily: "JetBrainsMono-Regular",
    marginBottom: 20,
  },
  controls: {
    width: "100%",
    alignItems: "center",
  },
  slider: {
    width: "90%",
    height: 40,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  timeText: {
    fontSize: 14,
  },
  details: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 30,
  },
  controlButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginTop: 20,
  },
  text: {
    fontSize: 16,
  },
});
