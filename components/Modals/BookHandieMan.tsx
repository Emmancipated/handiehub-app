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
} from '../../styles/colors';
import { SvgXml } from 'react-native-svg';
import { closeIcon } from '../../assets/svgs/svgs';
import { fontFamily, subHeaderFontSize } from '../../styles/fonts';
import { BookHandiemanInput } from '../Atoms/BookHandieManInput/HandieManInput';
import { ActionButton } from '../Atoms/ActionButton/ActionButton';

const { width } = Dimensions.get('window');

const BookHandieManModal = ({
  actionOne,
  actionTwo,
}: {
  actionOne: () => void;
  actionTwo: () => void;
}) => {
  // const getImage = async () => {
  //   const result = await launchImageLibrary();
  //   console.log(result);
  // };
  return (
    <View style={styles.container}>
      <View>
        <View
          style={styles.headerWrapper}>
          <Text style={styles.header}>
            Book Handieman
          </Text>
          <Pressable onPress={actionTwo}>
            <SvgXml xml={closeIcon} width="24px" height="24px" />
          </Pressable>
        </View>
        <BookHandiemanInput
          title="Project title"
          placeHolder="project name"
          inputType="text"
        />
        <BookHandiemanInput
          title="Price"
          placeHolder="amount in NGN"
          inputType="text"
        />
        <BookHandiemanInput
          title="Project brief"
          placeHolder=""
          inputType="textArea"
        />

        <BookHandiemanInput
          title="Upload image"
          placeHolder=""
          inputType="upload"
        />
        <View style={styles.actionButton}>
          <ActionButton text='Proceed' action={actionOne} />
        </View>

      </View>
    </View>
  );
};

export default BookHandieManModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    width: width,
    padding: tertiaryPadding,
    flex: 1,
    height: '100%',
  },
  actionButton: {
    height: '100%',
    marginVertical: 16,
  },
  header: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 20
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: secondaryGap,
  },
});
