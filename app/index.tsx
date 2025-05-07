import { StyleSheet, Text } from "react-native";

import Masked from "@react-native-masked-view/masked-view";
import { BlurView } from "expo-blur";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { useReanimatedHeaderHeight } from "react-native-screens/reanimated";

import * as AC from "@bacons/apple-colors";

const AnimMask = Animated.createAnimatedComponent(Masked);

export default function HomeScreen() {
  const ref = useAnimatedRef<Animated.ScrollView>();
  const scroll = useScrollViewOffset(ref);
  const style = useAnimatedStyle(() => ({
    opacity: interpolate(scroll.value, [-152, -20], [0, 1], "clamp"),
  }));

  return (
    <>
      <Animated.ScrollView
        ref={ref}
        contentContainerStyle={{ paddingTop: 48 }}
        contentInsetAdjustmentBehavior={"automatic"}
      >
        {new Array(20).fill(0).map((_, index) => (
          <Text
            key={index}
            style={{
              padding: 16,
              margin: 8,
              backgroundColor: AC.secondarySystemGroupedBackground,
              borderRadius: 8,
              color: AC.label,
              textAlign: "center",
              fontSize: 24,
              fontWeight: "bold",
              fontFamily:
                process.env.EXPO_OS === "ios" ? "ui-rounded" : undefined,
            }}
          >
            Step {index + 1}
          </Text>
        ))}
      </Animated.ScrollView>

      <Glur direction="top" style={style} />
    </>
  );
}

function Glur({ direction, style }: { direction: "top" | "bottom" }) {
  const headerHeight = useReanimatedHeaderHeight();
  return (
    <AnimMask
      maskElement={
        <Animated.View
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "transparent",
              experimental_backgroundImage: `linear-gradient(to ${direction}, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 75%)`,
            },
            style,
          ]}
        />
      }
      style={{
        position: "absolute",
        top: headerHeight,
        left: 0,
        right: 0,
        bottom: 0,
        height: 96,
      }}
    >
      <BlurView
        intensity={100}
        tint={"systemChromeMaterial"}
        style={StyleSheet.absoluteFill}
      />
    </AnimMask>
  );
}
