import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
  black100,
  foundationGray100,
  primaryColor,
  secondaryGray,
} from '../../../styles/colors';
import { fontFamily, subHeaderFontSize } from '../../../styles/fonts';
import { uploadIcon } from '../../../assets/svgs/svgs';

export const BookHandiemanInput = ({
  title,
  placeHolder,
  inputType,
  actionClick,
}: {
  title: string;
  placeHolder: string;
  inputType: string;
  actionClick?: () => void;
}) => {
  const [focusStatus, setFocusStatus] = useState(false);
  const border = focusStatus && styles.inputActiveBorder;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.headerText}>{title}</Text>
      {inputType === 'text' && (
        <TextInput
          style={[styles.inputStyle, border]}
          placeholder={placeHolder}
          underlineColorAndroid="transparent"
          placeholderTextColor={secondaryGray}
          selectionColor={primaryColor}
          cursorColor={primaryColor}
          enterKeyHint="search"
          onFocus={() => setFocusStatus(true)}
          onBlur={() => setFocusStatus(false)}
        />
      )}
      {inputType === 'textArea' && (
        <TextInput
          style={[styles.inputStyle, border, styles.textAreaStyle]}
          placeholder={placeHolder}
          underlineColorAndroid="transparent"
          placeholderTextColor={secondaryGray}
          selectionColor={primaryColor}
          cursorColor={primaryColor}
          onFocus={() => setFocusStatus(true)}
          onBlur={() => setFocusStatus(false)}
          multiline={true}
          numberOfLines={6}
        />
      )}
      {inputType === 'upload' && (
        <Pressable>
          <View
            style={[
              styles.inputStyle,
              styles.uploadStyle,
              styles.uploadStyleBorder,
            ]}>
            <View style={styles.uploadIconStyle}>
              <SvgXml xml={uploadIcon} style={styles.uploadIconStyle} />
              <Text style={styles.uploadText}>
                Drag and drop a Photo or{' '}
                <Text
                  style={styles.uploadActionText}
                  onPress={() => actionClick}>
                  Browse
                </Text>
              </Text>
            </View>
          </View>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
  },
  headerText: {
    fontFamily: fontFamily,
    fontWeight: '700',
    color: black100,
    fontSize: subHeaderFontSize,
  },
  inputStyle: {
    borderColor: foundationGray100,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
    paddingHorizontal: 16,
    width: '100%',
  },
  inputActiveBorder: {
    borderColor: primaryColor,
    borderWidth: 2,
  },
  textAreaStyle: {
    textAlignVertical: 'top',
  },
  uploadStyle: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 150,
  },
  uploadText: {
    color: '#868686',
    fontWeight: '400',
    fontSize: 14,
  },
  uploadActionText: {
    color: '#5B48FC',
  },
  uploadIconStyle: {
    alignItems: 'center',
    marginVertical: 4,
  },
  uploadStyleBorder: {
    borderStyle: 'dashed',
  },
});
