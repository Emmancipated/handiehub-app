import React, { useState } from "react";
import CheckBox from "expo-checkbox";

interface IProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const CheckBoxComponent: React.FC<IProps> = ({ value, onValueChange }) => {
  return (
    <CheckBox
      disabled={false}
      value={value}
      onValueChange={onValueChange}
      color={"#5B48FC"}
    />
  );
};

export default CheckBoxComponent;
