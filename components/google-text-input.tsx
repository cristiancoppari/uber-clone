import { View, Text } from "react-native";

type GoogleTextInputProps = {
  icon: any;
  containerStyles?: string;
  handlePress: () => void;
  initialLocation?: string;
  textInputBackgroundColor?: string;
};
export default function GoogleTextInput({
  icon,
  containerStyles,
  handlePress,
}: GoogleTextInputProps) {
  return (
    <View
      className={`relative z-50 mb-5 flex flex-row items-center justify-center rounded-xl ${containerStyles || ""}`}
    >
      <Text>Search</Text>
    </View>
  );
}
