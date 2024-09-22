import { router } from "expo-router";
import { useRef, useState } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

import CustomButton from "@/components/custom-button";
import { onboarding } from "@/constants";

export default function WelcomePage() {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      <TouchableOpacity
        className="flex w-full items-end justify-end p-5"
        onPress={() => router.replace("/(auth)/sign-up")}
      >
        <Text className="text-md font-JakartaBold text-black">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="mx-1 h-1 w-8 rounded-full bg-[#E2E8F0]" />}
        activeDot={<View className="mx-1 h-1 w-8 rounded-full bg-[#0286ff]" />}
        index={activeIndex}
        onIndexChanged={(i) => setActiveIndex(i)}
      >
        {onboarding.map((item, i) => (
          <View key={i} className="flex items-center justify-center p-5">
            <Image
              source={item.image}
              className="h-[300px] w-full"
              resizeMode="contain"
            />

            <View className="mt-10 flex w-full flex-row items-center justify-center">
              <Text className="text-center font-JakartaBold text-3xl text-black">
                {item.title}
              </Text>
            </View>
            <Text className="text-md mx-10 mt-3 text-center font-JakartaSemiBold text-lg text-[#858585]">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
        classNames="mt-10 w-11/12"
      />
    </SafeAreaView>
  );
}
