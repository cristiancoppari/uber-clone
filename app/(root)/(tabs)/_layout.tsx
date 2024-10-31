import { Tabs } from "expo-router";
import { View, Image, ImageSourcePropType } from "react-native";

import { icons } from "@/constants";

type TabIconProps = {
  focused: boolean;
  source: ImageSourcePropType;
};
const TabIcon = ({ focused, source }: TabIconProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center rounded-full ${focused ? "bg-general-300" : ""}`}
    >
      <View
        className={`h-12 w-12 items-center justify-center rounded-full ${focused ? "bg-general-400" : ""}`}
      >
        <Image
          source={source}
          className={`h-7 w-7`}
          tintColor={"white"}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default function Layout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333",
          borderRadius: 50,
          paddingBottom: 0,
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          height: 78,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.list} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.chat} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.profile} />
          ),
        }}
      />
    </Tabs>
  );
}
