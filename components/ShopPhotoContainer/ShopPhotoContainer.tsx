import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import {
  grayText,
  primaryBlack,
  primaryColor,
  primaryOrange,
  secondaryColor,
  white,
} from '../../styles/colors';
import { SvgXml } from 'react-native-svg';
import { chatIcon2, checkMark, ratingStar } from '../../assets/svgs/svgs';
import {
  regularFontSize,
  regularFontWeight,
  subHeaderFontWeight,
} from '../../styles/fonts';
import { headerFontSize } from '../../styles/topography';

export const ShopPhotoContainer = ({ navigate }: { navigate: any }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../assets/images/ProfilePic.png')}
          alt="profile-picture"
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.cardName}>
        <Text style={styles.handieName}>David Farinde</Text>

        <SvgXml xml={checkMark} width="20px" height="20px" />
      </View>
      <Text style={styles.regularFont}>Professional Furniture</Text>
      <View style={[styles.cardName]}>
        <SvgXml xml={ratingStar} width="20px" height="20px" />
        <Text style={styles.ratingNumber}>5.0</Text>
        <Text style={styles.ratingCount}>(128)</Text>
      </View>

      <View style={[styles.cardName, styles.messageButton]}>
        <SvgXml xml={chatIcon2} width="20px" height="20px" />
        <Pressable onPress={navigate}>
          <Text style={styles.messageText}>Message</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
  },
  imageWrapper: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 64,
    paddingVertical: 32,
  },
  imageStyle: {
    flex: 1,
    width: '100%',
    borderRadius: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 200,
    aspectRatio: 1 / 1,
  },
  cardName: {
    flex: 1,
    flexDirection: 'row',
    gap: 4,
    marginVertical: 14,
    alignItems: 'center',
    alignSelf: 'center',
  },
  handieName: {
    fontSize: headerFontSize,
    color: primaryBlack,
    fontWeight: subHeaderFontWeight,
  },
  regularFont: {
    color: grayText,
    fontWeight: regularFontWeight,
  },
  ratingNumber: {
    color: primaryOrange,
    fontSize: regularFontSize,
    fontWeight: regularFontWeight,
  },
  ratingCount: {
    color: grayText,
  },
  messageButton: {
    backgroundColor: secondaryColor,
    paddingHorizontal: 32,
    paddingVertical: 14,
    gap: 8,
    borderRadius: 100,
  },
  messageText: {
    fontSize: 14,
    fontWeight: '600',
    color: primaryColor,
  },
});
