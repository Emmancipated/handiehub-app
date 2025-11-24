// import React, { useEffect, useState } from "react";
// import { Text, View } from "react-native";
// import tw from "twrnc";

// interface CountdownTimerProps {
//   targetTime: string | Date; // ISO string or Date object
// }

// const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetTime }) => {
//   const [timeLeft, setTimeLeft] = useState<number>(
//     new Date(targetTime).getTime() - Date.now()
//   );

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeLeft(new Date(targetTime).getTime() - Date.now());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [targetTime]);

//   const totalSeconds = Math.floor(timeLeft / 1000);
//   const days = Math.floor(totalSeconds / (3600 * 24));
//   const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
//   const minutes = Math.floor((totalSeconds % 3600) / 60);
//   const seconds = totalSeconds % 60;

//   const isLessThan24Hours = timeLeft < 24 * 60 * 60 * 1000;

//   return (
//     <View>
//       <Text
//         style={tw`text-base font-semibold mb-1 ${
//           isLessThan24Hours ? "text-[#EE4B2B]" : "text-[#131313]"
//         }`}
//       >
//         {`${days}d ${hours.toString().padStart(2, "0")}:${minutes
//           .toString()
//           .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
//       </Text>
//     </View>
//   );
// };

// export default CountdownTimer;

import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import tw from "twrnc";

interface CountdownTimerProps {
  targetTime: string | Date; // ISO string or Date object
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetTime }) => {
  const [timeLeft, setTimeLeft] = useState<number>(
    new Date(targetTime).getTime() - Date.now()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(targetTime).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft(0);
        clearInterval(interval); // Stop countdown when time is up
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  const totalSeconds = Math.floor(timeLeft / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const isLessThan24Hours = timeLeft < 24 * 60 * 60 * 1000;

  return (
    <View>
      <Text
        style={tw`text-base font-semibold ${
          isLessThan24Hours ? "text-[#EE4B2B]" : "text-[#131313]"
        }`}
      >
        {timeLeft <= 0
          ? "0d 00:00:00"
          : `${days}d ${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
      </Text>
    </View>
  );
};

export default CountdownTimer;
