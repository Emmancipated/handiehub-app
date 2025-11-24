import React from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import {tertiaryPadding} from '../../styles/topography';

const {width} = Dimensions.get('window');
const gap = 12;
const itemsPerRow = 2;
const totalGapSize = (itemsPerRow - 1) * gap;
const windowWidth = width - tertiaryPadding * 2;
const childWidth = (windowWidth - totalGapSize) / itemsPerRow;
const height = (childWidth * 3) / 4;

// const originalArray = [
//   '../../assets/images/image5.jpg',
//   '../../assets/images/image5.jpg',
//   '../../assets/images/ProfilePic.png',
//   '../../assets/images/ProfilePic.png',
//   '../../assets/images/image5.jpg',
//   '../../assets/images/image5.jpg',
//   '../../assets/images/ProfilePic.png',
//   '../../assets/images/ProfilePic.png',
//   '../../assets/images/image5.jpg',
//   '../../assets/images/image5.jpg',
//   '../../assets/images/ProfilePic.png',
//   '../../assets/images/ProfilePic.png',
// ];
// const copiedArray = [];
// let id = 1;
// let index = 0;

// while (index < originalArray.length) {
//   let longImage = [originalArray[index]];
//   let doubleImages = originalArray.slice(index + 1, index + 3);
//   let largeImage = originalArray.slice(index + 3, index + 4);

//   copiedArray.push({
//     id,
//     longImage,
//     doubleImages,
//     largeImage,
//   });
//   id++;
//   index += 4;
// }

export const HandieManPortfolio = () => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/ProfilePic.png')}
          style={[styles.item, styles.item1]}
          alt="service"
        />

        <View style={styles.sideContainer}>
          <Image
            source={require('../../assets/images/image5.jpg')}
            style={[styles.item, styles.item2]}
            alt="service"
          />
          <Image
            source={require('../../assets/images/ProfilePic.png')}
            style={[styles.item, styles.item3]}
            alt="service"
          />
        </View>

        <Image
          source={require('../../assets/images/image5.jpg')}
          style={[styles.item, styles.item4]}
          alt="service"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    gap: gap,
  },
  item: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  sideContainer: {height: 250, rowGap: gap},
  item1: {
    width: childWidth,
    height: 250,
    flex: 1,
    borderRadius: 12,
  },
  item2: {
    width: childWidth,
    height: height,
    flex: 1,
    borderRadius: 12,
  },
  item3: {
    width: childWidth,
    height: height,
    flex: 1,
    borderRadius: 12,
  },
  item4: {
    width: windowWidth,
    height: 250,
    borderRadius: 12,
  },
});
