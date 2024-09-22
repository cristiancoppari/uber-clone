import { Text, View, Image } from "react-native";

import { icons } from "@/constants";

import CustomButtom from "./custom-button";

export default function OAuth() {
  const handleGoogleSignIn = async () => {
    // Add your code here
  };

  return (
    <View>
      <View className="mt-4 flex flex-row items-center justify-center gap-x-3">
        <View className="h-[1px] flex-1 bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="h-[1px] flex-1 bg-general-100" />
      </View>

      <CustomButtom
        title="Log In With Google"
        classNames="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image source={icons.google} className="mx-2 h-6 w-6" />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
}
