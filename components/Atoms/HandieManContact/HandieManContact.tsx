import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {primaryLineHeight, primaryPadding} from '../../../styles/topography';

export const HandieManContact = ({
  text,
  icon,
}: {
  text: string;
  icon: string;
}) => {
  return (
    <View style={styles.handieManTag}>
      <SvgXml xml={icon} width="24px" height="24px" />
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  handieManTag: {
    paddingVertical: primaryPadding,
    lineHeight: primaryLineHeight,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});
