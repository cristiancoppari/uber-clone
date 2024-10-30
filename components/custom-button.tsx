import { TouchableOpacity, Text } from "react-native";

import { cn } from "@/lib/utils";

import type { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#0286ff]";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-500";
    case "success":
      return "text-green-500";
    default:
      return "text-white";
  }
};

export default function CustomButtom({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  classNames,
}: ButtonProps) {
  return (
    <TouchableOpacity
      className={cn(
        "flex w-full flex-row items-center justify-center rounded-full p-3 shadow-md shadow-neutral-400/70",
        getBgVariantStyle(bgVariant),
        classNames,
      )}
      onPress={onPress}
    >
      {IconLeft && <IconLeft className="mr-2" />}
      <Text
        className={cn("text-lg font-bold", getTextVariantStyle(textVariant))}
      >
        {title}
      </Text>
      {IconRight && <IconRight className="ml-2" />}
    </TouchableOpacity>
  );
}
