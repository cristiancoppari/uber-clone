import { Link } from "expo-router";
import { useState } from "react";
import { ScrollView, Image, View, Text } from "react-native";

import CustomButtom from "@/components/custom-button";
import InputField from "@/components/input-field";
import OAuth from "@/components/oauth";
import { images } from "@/constants";
import { icons } from "@/constants";

export default function SignInPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = async () => {
    // Add your code here
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative h-[250px] w-full">
          <Image source={images.signUpCar} className="z-0 h-[250px] w-full" />
          <Text className="absolute bottom-5 left-5 font-JakartaSemiBold text-2xl text-black">
            Welcome
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            secureTextEntry
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButtom
            classNames="mt-6"
            title="Sign In"
            onPress={onSignInPress}
          />

          <OAuth />

          <Link
            href="/sign-up"
            className="mt-10 text-center text-lg text-general-200"
          >
            <Text>Don't have an account? </Text>
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>

        {/* Verification Modal */}
      </View>
    </ScrollView>
  );
}
