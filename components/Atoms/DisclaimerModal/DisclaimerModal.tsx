import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {infoIcon} from '../../../assets/svgs/svgs';
import {ActionButton} from '../ActionButton/ActionButton';
import {orangeShadeOne, primaryBlack, white} from '../../../styles/colors';
import {
  largePadding,
  primaryBorderRadius,
  primaryMargin,
  tertiaryPadding,
} from '../../../styles/topography';
import {headerFontSize, headerFontWeight} from '../../../styles/fonts';

const {width} = Dimensions.get('window');

export const DisclaimerModal = ({
  actionOne,
  actionTwo,
}: {
  actionOne: () => void;
  actionTwo: () => void;
}) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modal}>
        <View style={styles.iconContainer}>
          <View style={styles.iconWrapper}>
            <SvgXml xml={infoIcon} width="24px" height="24px" />
          </View>
        </View>

        <Text style={styles.textHeader}>Disclaimer</Text>
        <Text style={styles.text}>
          Please, note we will not be responsible for any breach of contract
          with any handieman
        </Text>
        <ActionButton text="Proceed" action={actionOne} />
        <ActionButton text="Close" lightPurple action={actionTwo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    // height: height,
    // position: 'absolute',
    backgroundColor: 'transparent',
    borderRadius: 12,
  },
  modal: {
    backgroundColor: white,
    borderRadius: 12,
    padding: largePadding,
    width: width - primaryMargin * 2,
    // borderWidth: 1,
    shadowColor: '#1f1f1f',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginVertical: 16,
    position: 'relative',
    zIndex: 2000,
    elevation: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  iconWrapper: {
    backgroundColor: orangeShadeOne,
    borderRadius: primaryBorderRadius,
    padding: tertiaryPadding,
  },
  textHeader: {
    textAlign: 'center',
    marginVertical: primaryMargin,
    fontSize: headerFontSize,
    fontWeight: headerFontWeight,
    color: primaryBlack,
  },
  text: {
    textAlign: 'center',
  },
});
