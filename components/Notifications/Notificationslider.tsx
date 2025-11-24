// import { failedCheckSvg, goodcheckSvg } from "@/assets/svgs/svgs";
// import { View, Text } from "react-native";
// import { SvgXml } from "react-native-svg";
// import tw from "twrnc";
// import Animated, {
//   useAnimatedStyle,
//   withTiming,
//   Easing,
// } from "react-native-reanimated";
// import { useEffect, useState } from "react";

// const SuccessSlideIn = ({
//   openModal,
//   responseType,
//   successActionResponse,
// }: {
//   openModal: boolean;
//   responseType: null | string;
//   successActionResponse: string;
// }) => {
//   const [visible, setVisible] = useState(openModal);

//   useEffect(() => {
//     if (openModal) {
//       setVisible(true);
//     } else {
//       setTimeout(() => setVisible(false), 300);
//     }
//   }, [openModal]);

//   const slideAnim = useAnimatedStyle(() => ({
//     transform: [
//       {
//         translateY: withTiming(openModal ? 0 : -100, {
//           duration: 300,
//           easing: Easing.out(Easing.exp),
//         }),
//       },
//     ],
//     opacity: withTiming(openModal ? 1 : 0, {
//       duration: 300,
//       easing: Easing.out(Easing.exp),
//     }),
//   }));

//   if (!visible) return null;

//   const isSuccess = responseType === "success";

//   return (
//     <Animated.View
//       style={[
//         tw`absolute top-5 left-4 right-4 z-50 rounded-lg shadow-lg flex-row overflow-hidden`,
//         slideAnim,
//         {
//           backgroundColor: isSuccess ? "#d9f9e7" : "#fcf3f2",
//           elevation: 4,
//         },
//       ]}
//     >
//       {/* ✅ Status Bar */}
//       <View
//         style={[
//           tw`w-2`,
//           {
//             backgroundColor: isSuccess ? "#30B42D" : "#8D2822",
//           },
//         ]}
//       />

//       {/* ✅ Content Area */}
//       <View style={tw`flex-row items-start px-4 py-3 flex-1`}>
//         <SvgXml
//           xml={isSuccess ? goodcheckSvg : failedCheckSvg}
//           width="24"
//           height="24"
//           style={tw`mt-1 mr-3`}
//         />
//         <View style={tw`flex-1`}>
//           <Text
//             style={tw`font-bold text-base mb-1 ${
//               isSuccess ? "text-[#14532d]" : "text-[#7f1d1d]"
//             }`}
//           >
//             {isSuccess ? "Success" : "Failed"}
//           </Text>
//           <Text style={tw`text-sm text-gray-800`}>{successActionResponse}</Text>
//         </View>
//       </View>
//     </Animated.View>
//   );
// };

// export default SuccessSlideIn;

import { failedCheckSvg, goodcheckSvg } from "@/assets/svgs/svgs";
import { View, Text } from "react-native";
import { SvgXml } from "react-native-svg";
import tw from "twrnc";
import Animated, {
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useEffect, useState } from "react";

const SuccessSlideIn = ({
  openModal,
  responseType,
  successActionResponse,
}: {
  openModal: boolean;
  responseType: null | string;
  successActionResponse: string;
}) => {
  const [visible, setVisible] = useState(openModal);

  // 🧠 Store values at open time to prevent flickering on exit
  const [displayType, setDisplayType] = useState<null | string>(null);
  const [displayMessage, setDisplayMessage] = useState<string>("");

  useEffect(() => {
    if (openModal) {
      setDisplayType(responseType);
      setDisplayMessage(successActionResponse);
      setVisible(true);
    } else {
      // wait for animation to finish before hiding completely
      setTimeout(() => setVisible(false), 300);
    }
  }, [openModal, responseType, successActionResponse]);

  const slideAnim = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withTiming(openModal ? 0 : -100, {
          duration: 300,
          easing: Easing.out(Easing.exp),
        }),
      },
    ],
    opacity: withTiming(openModal ? 1 : 0, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    }),
  }));

  if (!visible) return null;

  const isSuccess = displayType === "success";

  return (
    <Animated.View
      style={[
        tw`absolute top-5 left-4 right-4 z-50 rounded-lg shadow-lg flex-row overflow-hidden`,
        slideAnim,
        {
          backgroundColor: isSuccess ? "#d9f9e7" : "#fcf3f2",
          elevation: 4,
        },
      ]}
    >
      {/* ✅ Status Bar */}
      <View
        style={[
          tw`w-2`,
          {
            backgroundColor: isSuccess ? "#30B42D" : "#8D2822",
          },
        ]}
      />

      {/* ✅ Content Area */}
      <View style={tw`flex-row items-start px-4 py-3 flex-1`}>
        <SvgXml
          xml={isSuccess ? goodcheckSvg : failedCheckSvg}
          width="24"
          height="24"
          style={tw`mt-1 mr-3`}
        />
        <View style={tw`flex-1`}>
          <Text
            style={tw`font-bold text-base mb-1 ${
              isSuccess ? "text-[#14532d]" : "text-[#7f1d1d]"
            }`}
          >
            {isSuccess ? "Success" : "Failed"}
          </Text>
          <Text style={tw`text-sm text-gray-800`}>{displayMessage}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default SuccessSlideIn;
