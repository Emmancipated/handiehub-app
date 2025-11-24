import React, {PropsWithChildren, useEffect, useState} from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {dropDownArrow} from '../../assets/svgs/svgs';
import {white} from '../../styles/colors';

type SectionProps = PropsWithChildren<{
  title: string;
  lastItem?: boolean;
}>;

export const DropDownOpener = ({children, title, lastItem}: SectionProps) => {
  const [openModal, setOpenModal] = useState(true); //allow modals open so as to get their heights
  const [childHeight, setChildHeight] = useState<number>(0);

  let spinValue = new Animated.Value(0);

  Animated.timing(spinValue, {
    toValue: 1,
    duration: 200,
    easing: Easing.linear,
    useNativeDriver: false,
  }).start();

  const spinUp = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const spinBack = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });
  const viewOpen = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, childHeight],
  });
  const viewClose = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: [childHeight, 0],
  });

  const onChildLayout = (event: LayoutChangeEvent) => {
    if (childHeight === 0) {
      // Check if the height is already set
      const {height} = event.nativeEvent.layout;
      setChildHeight(height);
    }
  };

  useEffect(() => {
    if (childHeight > 0) {
      setOpenModal(false); //close modal once height has been obtained
    }
  }, [childHeight]);

  return (
    <>
      <TouchableOpacity
        style={styles.modalHeadSection}
        onPress={() => {
          setOpenModal(!openModal);
        }}
        activeOpacity={0.7}>
        <Text style={styles.header}>{title}</Text>
        <Animated.View
          style={[
            openModal && {transform: [{rotateZ: spinUp}]},
            !openModal && {transform: [{rotateZ: spinBack}]},
          ]}>
          <SvgXml xml={dropDownArrow} width="24px" height="24px" />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View
        style={[
          openModal && childHeight > 0 && {height: viewOpen},
          !openModal && childHeight > 0 && {height: viewClose},
          lastItem && styles.lastModalHeadSection,
        ]}
        onLayout={onChildLayout}>
        <View style={styles.contentBox}>{children}</View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: white,
  },
  modalHeadSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
    // borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#F3F3F3',
    alignItems: 'center',
  },
  lastModalHeadSection: {
    borderBottomWidth: 1,
    borderColor: '#F3F3F3',
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
  },
  contentBox: {
    paddingBottom: 16,
  },
});
