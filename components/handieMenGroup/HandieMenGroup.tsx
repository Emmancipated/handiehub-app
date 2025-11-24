import React, {PropsWithChildren} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  mainHeaderFontSize,
  primaryGap,
  primaryMargin,
} from '../../styles/topography';
import {headerFontWeight} from '../../styles/fonts';
import {primaryBlack, primaryColor} from '../../styles/colors';

type SectionProps = PropsWithChildren<{
  viewAll?: string;
  header: string;
  style?: any;
}>;

export const HandieMenGroup = ({
  children,
  viewAll,
  header,
  style,
}: SectionProps) => {
  return (
    <View style={[style]}>
      {viewAll ? (
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{header}</Text>
          <Text style={styles.headerLink}>{viewAll}</Text>
        </View>
      ) : (
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{header}</Text>
        </View>
      )}
      <View style={styles.navBlock}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.navContainer}
          showsHorizontalScrollIndicator={false}>
          {children}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: primaryMargin,
  },
  headerTitle: {
    fontSize: mainHeaderFontSize,
    fontWeight: headerFontWeight,
    color: primaryBlack,
  },
  headerLink: {
    color: primaryColor,
  },
  navBlock: {flex: 1},
  navContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: primaryGap,
    marginVertical: 20,
  },
});
