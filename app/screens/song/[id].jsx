import React, { useEffect, useState, useRef } from "react";
import { Loading } from "../../../src/components/loading";
import {
  StyleSheet,
  ScrollView,
  View,
  Animated,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "../../../src/context/ThemeContext";
import { GetSong } from "../../../src/utils/subsonic/songs";
import { SecondaryText } from "../../../src/components/text";
import { CoverImage } from "../../../src/components/image";
import { NextBtn, PrevBtn, RepeatBtn, ShuffleBtn, TogglePlayPauseBtn } from "../../../src/components/button";
import { usePlaylist } from "../../../src/context/PlaylistContext";

export default function Song() {
  const [song, setSong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const { id, cover } = useLocalSearchParams();
  const { style } = useTheme();
  const { isPlaying, InitSong, TogglePlayPause, sound } = usePlaylist();
  const scrollAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchSong = async () => {
      const songDetails = await GetSong(id);
      if (songDetails) {
        setSong(songDetails);
        setDuration(songDetails.duration || 0);
        InitSong(id);
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
      startTitleAnimation();
    }
  }, [song, containerWidth]);

  const onTitleLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  if (!song) {
    return (
      <Loading />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: style.background }]}>
      <CoverImage source={cover} />
      <View style={styles.titleContainer} onLayout={onTitleLayout}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Animated.Text
            style={[
              styles.title,
              { color: style.text },
              { transform: [{ translateX: scrollAnim }] },
            ]}
            numberOfLines={1}
          >
            {song.title}
          </Animated.Text>
        </ScrollView>

        <SecondaryText text={song.artist} />
      </View>
      <View style={styles.controls}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor={style.accent}
          maximumTrackTintColor={style.secondaryText}
          thumbTintColor={style.accent}
          value={currentTime}
          onSlidingComplete={handleSliderChange}
        />
        <View style={styles.timeContainer}>
          <SecondaryText text={formatTime(currentTime)} />
          <SecondaryText text={formatTime(duration)} />
        </View>
        <SecondaryText text={song.suffix + " - " + song.bitRate + "kbps"} />
      </View>
      <View style={styles.controlButtons}>
        <ShuffleBtn />
        <PrevBtn />
        <TogglePlayPauseBtn toggle={isPlaying} onPress={TogglePlayPause} />
        <NextBtn />
        <RepeatBtn />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: "JetBrainsMono-Bold",
  },
  titleContainer: {
    width: "90%",
    alignItems: "flex-start",
    marginBottom: "35%",
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
  controlButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginTop: "12%",
  },
  volumeContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  volumeSlider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
  },
  volumeIcon: {
    marginHorizontal: 5,
  },
});
