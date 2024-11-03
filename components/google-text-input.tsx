// Have to add it because of crypto error
import "react-native-get-random-values";
import { View, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { icons } from "@/constants";

import type { GoogleInputProps } from "@/types/type";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_PLACES_API_KEY;

export default function GoogleTextInput({
  icon,
  initialLocation,
  containerStyle,
  handlePress,
  textInputBackgroundColor,
}: GoogleInputProps) {
  return (
    <View
      className={`relative z-50 mb-5 flex flex-row items-center justify-center rounded-xl ${containerStyle || ""}`}
    >
      <GooglePlacesAutocomplete
        placeholder="Search for a destination"
        query={{
          key: googlePlacesApiKey,
          language: "en",
        }}
        fetchDetails={true}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#d4d4d4",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || "#fff",
            fontSize: 16,
            fontWeight: 600,
            martinTop: 5,
            borderRadius: 200,
            width: "100%",
          },
          listView: {
            backgroundColor: textInputBackgroundColor || "#fff",
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
        renderLeftButton={() => (
          <View className="h-6 w-6 items-center justify-center">
            <Image
              source={icon ? icon : icons.search}
              className="h-4 w-4"
              resizeMode="contain"
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation || "Where do you want to go?",
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
      />
    </View>
  );
}
