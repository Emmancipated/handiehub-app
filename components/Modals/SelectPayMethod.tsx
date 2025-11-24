import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  primaryMargin,
  primaryPadding,
  secondaryGap,
  tertiaryPadding,
} from '../../styles/topography';
import {
  black100,
  foundationGray100,
  primaryColor,
  secondaryGray,
  white,
  secondaryColor,
  primaryBlack,
  grayText,
} from '../../styles/colors';
import { SvgXml } from 'react-native-svg';
import { closeIcon, backArrowIcon, briefCaseIcon } from '../../assets/svgs/svgs';
import { fontFamily, subHeaderFontSize } from '../../styles/fonts';
import { BookHandiemanInput } from '../Atoms/BookHandieManInput/HandieManInput';
import { ActionButton } from '../Atoms/ActionButton/ActionButton';

const { width } = Dimensions.get('window');

const SelectPaymentMethodModal = ({
  actionOne,
  actionTwo,
}: {
  actionOne: () => void;
  actionTwo: () => void;
}) => {

  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', justifyContent: 'space-between', height: 720, }}>
        <View>
          <View
            style={styles.headerWrapper}>
            <View style={{ display: 'flex', flexDirection: 'row', columnGap: 8, alignItems: 'center' }}>
              <Pressable onPress={actionTwo}>
                <SvgXml xml={backArrowIcon} width="24px" height="24px" />
              </Pressable>
              <Text style={styles.header}>
                Select Payment Method
              </Text>
            </View>
            <Pressable onPress={actionTwo}>
              <SvgXml xml={closeIcon} width="24px" height="24px" />
            </Pressable>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
            <View style={{ display: 'flex', flexDirection: 'row', columnGap: 12, marginTop: 16 }}>
              <View style={{ width: 48, height: 48, borderRadius: 999, padding: 16, backgroundColor: secondaryColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SvgXml xml={briefCaseIcon} width="24px" height="24px" />
              </View>
              <View>
                <Text style={{ fontSize: 16, fontWeight: '600', fontFamily: fontFamily, color: primaryBlack }}>Pay with card</Text>
                <Text style={{ color: grayText, fontSize: 14, fontWeight: '400', fontFamily: fontFamily }}>Make instant payment using bank card</Text>
              </View>
            </View>
            <View style={{ width: 20, height: 20, borderBlockColor: '#5B48FC', borderWidth: 1, borderRadius: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><View style={{ backgroundColor: '#5B48FC', width: 11, height: 11, borderRadius: 999 }}></View></View>
          </View>
        </View>



        <View style={styles.actionButton}>
          <ActionButton text='Proceed' action={actionOne} />
        </View>

      </View>
    </View>
  );
};

export default SelectPaymentMethodModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    width: width,
    padding: tertiaryPadding,
    flex: 1,
    height: '100%',
  },
  actionButton: {
    marginVertical: 16,
  },
  header: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 20,
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: secondaryGap,
  },
});
