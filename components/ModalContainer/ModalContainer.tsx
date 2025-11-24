import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {mainHeaderFontSize} from '../../styles/topography';
import {SvgXml} from 'react-native-svg';
import {closeIcon, dropDownArrow} from '../../assets/svgs/svgs';
import {headerFontWeight, subHeaderFontWeight} from '../../styles/fonts';

export const ModalContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <View>
      <View style={styles.logoSection}>
        <SvgXml
          xml={dropDownArrow}
          width="24px"
          height="24px"
          style={styles.leftArrow}
        />
        <Text style={styles.header}>Book Handieman</Text>
        <SvgXml
          xml={closeIcon}
          width="24px"
          height="24px"
          style={styles.leftArrow}
        />
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  logoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: primaryMargin,
    // marginVertical: primaryMargin,
  },
  leftArrow: {
    transform: [{rotate: '90deg'}],
    fontWeight: subHeaderFontWeight,
  },
  header: {
    fontSize: mainHeaderFontSize,
    fontWeight: headerFontWeight,
  },
});
