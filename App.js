import * as React from "react";
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";

import image1 from "./assets/slides/binance.png";
import image2 from "./assets/slides/camel.png";
import image3 from "./assets/slides/gift.png";
import image4 from "./assets/slides/stores.png";

const { width, height } = Dimensions.get("screen");

const bgs = ["#fbbf24", "#78350f", "#a21caf", "#0891b2"];
const DATA = [
  {
    key: "3571572",
    title: "Multi-lateral intermediate moratorium",
    description:
      "I'll back up the multi-byte XSS matrix, that should feed the SCSI application!",
    image: image1,
  },
  {
    key: "3571747",
    title: "Automated radical data-warehouse",
    description:
      "Use the optical SAS system, then you can navigate the auxiliary alarm!",
    image: image2,
  },
  {
    key: "3571680",
    title: "Inverse attitude-oriented system engine",
    description:
      "The ADP array is down, compress the online sensor so we can input the HTTP panel!",
    image: image3,
  },
  {
    key: "3571603",
    title: "Monitored global data-warehouse",
    description: "We need to program the open-source IB interface!",
    image: image4,
  },
];
//❤️
const Indicator = ({ scrollX }) => {
  return (
    <View style={{ position: "absolute", bottom: 100, flexDirection: "row" }}>
      {DATA.map((_, key) => {
        const inputRange = [(key - 1) * width, key * width, (key + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={`indicator-${key}`}
            className="h-4 w-4 rounded-[5px] bg-[#fff] m-2"
            style={{
              transform: [{ scale }],
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, index) => index * width),
    outputRange: bgs,
  });
  return (
    <Animated.View
      style={[
        styles.absoluteFillObject,
        {
          backgroundColor,
        },
      ]}
      className="z-0 h-screen w-screen absolute"
    ></Animated.View>
  );
};

const Square = ({ scrollX }) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "0deg", "35deg"],
  });

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, -height],
  });

  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: "#fff",
        borderRadius: 86,
        position: "absolute",
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [
          {
            rotate,
          },
          {
            translateX,
          },
        ],
      }}
    ></Animated.View>
  );
};

export default function App() {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View className="flex-1 justify-center items-center">
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => (
          <View style={{ width: width }} className="items-center px-4">
            <View className="flex-[0.7] justify-center p-5">
              <Image
                source={item.image}
                style={{
                  width: width / 2,
                  height: width / 2,
                  resizeMode: "contain",
                }}
              />
            </View>
            <View className="flex-[0.3] -mb-20">
              <Text className="text-white font-bold text-2xl mb-2.5">
                {item.title}
              </Text>
              <Text className="text-white tracking-tighter">
                {item.description}
              </Text>
            </View>
          </View>
        )}
      />
      <Indicator scrollX={scrollX} />
      <View className="w-full px-16 pb-10">
        <TouchableOpacity className="w-full bg-white py-4 rounded-lg">
          <Text className="text-center uppercase tracking-wide font-bold text-gray-900">Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
