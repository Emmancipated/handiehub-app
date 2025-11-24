import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {ratingStar} from '../../assets/svgs/svgs';
import {SvgXml} from 'react-native-svg';
import {primaryBorderRadius, secondaryGap} from '../../styles/topography';
import {subHeaderFontSize, subHeaderFontWeight} from '../../styles/fonts';
import {primaryBlack, primaryOrange} from '../../styles/colors';

export const HandieManReview = () => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={[styles.container, styles.cardBottomMargin]}>
        <Image
          source={require('../../assets/images/ProfilePic.png')}
          style={styles.imageStyle}
        />
        <View style={styles.flexSpacer}>
          <View style={styles.headerContainer}>
            <View style={styles.bottomMargin}>
              <Text style={styles.header}>Adebimpe</Text>
              <Text>2 months ago</Text>
            </View>
            <View style={styles.ratingWrapper}>
              <SvgXml xml={ratingStar} width="24px" height="24px" />
              <Text style={styles.ratingColor}>5.0</Text>
            </View>
          </View>
          <Text style={styles.bottomMargin}>
            Making fine furniture starts with the basics. Practicing basic
            techniques, just to improve on them, is not only a very good idea,
            it is a necessity. When I'm in the shop, and either don't feel like
            working on a particular project.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: secondaryGap,
  },
  imageStyle: {
    width: 48,
    height: 48,
    borderRadius: primaryBorderRadius,
  },
  flexSpacer: {
    justifyContent: 'space-between',
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'flex-start',
  },
  header: {
    fontWeight: subHeaderFontWeight,
    fontSize: subHeaderFontSize,
    color: primaryBlack,
    marginBottom: 10,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingColor: {
    color: primaryOrange,
  },
  bottomMargin: {
    marginBottom: 10,
  },
  cardBottomMargin: {
    marginBottom: 20,
  },
});
