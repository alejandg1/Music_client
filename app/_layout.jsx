import { Stack } from "expo-router"
import { ThemeProvider } from "../src/context/ThemeContext"
import { PlaylistProvider } from "../src/context/PlaylistsContext"


export default function Layout() {
  return (
      <PlaylistProvider>
        <ThemeProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "ios_from_right",
            }}
          />
        </ThemeProvider>
      </PlaylistProvider>
  )
}
