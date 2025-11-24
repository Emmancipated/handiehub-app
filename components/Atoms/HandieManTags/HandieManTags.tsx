import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  primaryBorderRadius,
  primaryLineHeight,
  primaryPadding,
  secondaryPadding,
} from '../../../styles/topography';
import {primaryColor, white} from '../../../styles/colors';
import {closeIcon} from '../../../assets/svgs/svgs';
import {SvgXml} from 'react-native-svg';

export const HandieManTags = ({text}: {text: string}) => {
  return (
    <View style={styles.handieManTag}>
      <Text style={styles.handieText}>{text}</Text>
      <SvgXml xml={closeIcon} width="24px" height="24px" />
    </View>
  );
};

const styles = StyleSheet.create({
  handieManTag: {
    paddingVertical: primaryPadding,
    paddingHorizontal: secondaryPadding,
    backgroundColor: primaryColor,
    borderRadius: primaryBorderRadius,
    lineHeight: primaryLineHeight,
    flexDirection: 'row',
    gap: 6,
  },
  handieText: {
    color: white,
    fontWeight: '600',
    fontSize: 14,
  },
});
