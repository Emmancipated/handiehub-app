import React from 'react';
import {StyleSheet, View} from 'react-native';
import {white} from '../../styles/colors';
import {PropsWithChildren} from 'react';

type NavBarFixed = PropsWithChildren;

export const FixedNavBar = ({children}: NavBarFixed) => {
  return <View style={styles.fixedNavContainer}>{children}</View>;
};

const styles = StyleSheet.create({
  fixedNavContainer: {
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    justifyContent: 'space-between',
    backgroundColor: white,
  },
});
