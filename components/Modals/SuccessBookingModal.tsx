import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
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
import { closeIcon, bigCheckMarkIcon } from '../../assets/svgs/svgs';
import { fontFamily, subHeaderFontSize } from '../../styles/fonts';
import { BookHandiemanInput } from '../Atoms/BookHandieManInput/HandieManInput';
import { ActionButton } from '../Atoms/ActionButton/ActionButton';

const { width } = Dimensions.get('window');

const SuccessBookingModal = ({
  actionOne,
  actionTwo,
}: {
  actionOne: () => void;
  actionTwo: () => void;
}) => {
  const [isSelected, setSelection] = useState(false);


  return (
    <View style={styles.container}>
      <View style={{ display: 'flex', justifyContent: 'space-between', height: 720, }}>
        <View>
          <View
            style={styles.headerWrapper}>
            <Pressable onPress={actionTwo}>
              <SvgXml xml={closeIcon} width="24px" height="24px" />
            </Pressable>
          </View>

          <View>
            <View style={{ backgroundColor: '#EFEDFF', width: 120, height: 120, borderRadius: 999, justifyContent: 'center', alignItems: 'center', marginHorizontal: 'auto', marginTop: 48 }}>
              <SvgXml xml={bigCheckMarkIcon} width="64px" height="64px" />
            </View>
            <Text style={{ color: primaryBlack, fontSize: 20, fontWeight: '700', textAlign: 'center', marginVertical: 16 }}>Handieman Booked</Text>
            <Text style={{ color: '#A6A6A6', fontSize: 14, fontWeight: '400', textAlign: 'center' }}>Your booking request has been sent successfully. You will be notified when booking has been accepted</Text>
          </View>
        </View>

        <View style={styles.actionButton}>
          <ActionButton text='Close' action={actionOne} lightPurple />
        </View>

      </View>
    </View>
  );
};

export default SuccessBookingModal;

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
    justifyContent: 'flex-end',
    marginBottom: secondaryGap,
  },
});
