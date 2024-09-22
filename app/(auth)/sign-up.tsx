import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState } from "react";
import { ScrollView, Image, View, Text, Alert } from "react-native";
import ReactNativeModal from "react-native-modal";

import CustomButtom from "@/components/custom-button";
import InputField from "@/components/input-field";
import OAuth from "@/components/oauth";
import { images } from "@/constants";
import { icons } from "@/constants";

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        // TODO: create a DB user

        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed.",
          state: "failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.error[0].longMessage,
        state: "failed",
      });
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative h-[250px] w-full">
          <Image source={images.signUpCar} className="z-0 h-[250px] w-full" />
          <Text className="absolute bottom-5 left-5 font-JakartaSemiBold text-2xl text-black">
            Create your account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
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
            title="Sign Up"
            onPress={onSignUpPress}
          />

          <OAuth />

          <Link
            href="/sign-in"
            className="mt-10 text-center text-lg text-general-200"
          >
            <Text>Already have an account? </Text>
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") setShowSuccessModal(true);
          }}
        >
          <View className="min-h-[300px] rounded-2xl bg-white px-7 py-9">
            <Text className="mb-2 font-JakartaExtraBold text-2xl text-black">
              Verification
            </Text>

            <Text className="mb-5 font-Jakarta">
              We've sent a verification code to {form.email}.
            </Text>

            <InputField
              label="Code"
              placeholder="12345"
              icon={icons.lock}
              keyboardType="numeric"
              value={verification.code}
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />

            {verification.error && (
              <Text className="mt-2 text-red-500">{verification.error}</Text>
            )}

            <CustomButtom
              title="Verify Email"
              onPress={onPressVerify}
              classNames="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="min-h-[300px] rounded-2xl bg-white px-7 py-9">
            <Image source={images.check} className="mx-auto my-5 h-28 w-28" />

            <Text className="text-center font-JakartaSemiBold text-2xl text-black">
              Verified
            </Text>

            <Text className="mt-2 text-center font-Jakarta text-base text-gray-400">
              You have successfully verified your account.
            </Text>

            <CustomButtom
              title="Browse Home"
              onPress={() => router.replace("/(root)/(tabs)/home")}
              classNames="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
}
