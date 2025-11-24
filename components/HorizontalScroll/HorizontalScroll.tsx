import React, {PropsWithChildren} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {primaryGap} from '../../styles/topography';

export const HorizontalScroll = ({children}: PropsWithChildren) => {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.horizontalScroll}
      showsHorizontalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  horizontalScroll: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: primaryGap,
    marginVertical: 20,
  },
});
