import React from 'react';
import {StyleSheet, Text} from 'react-native';

export const HandieHubText = (props: any) => {
  return <Text style={[styles.globalFont, props.style]}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  globalFont: {
    fontFamily: 'Proximanova-regularit',
  },
});
