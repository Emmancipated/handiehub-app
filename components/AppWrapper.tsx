import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {tertiaryPadding} from '../styles/topography';

const AppWrapper = ({children}: {children: React.ReactNode}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.appContainer}>{children}</View>
    </SafeAreaView>
  );
};

export default AppWrapper;

const styles = StyleSheet.create({
  appContainer: {
    paddingHorizontal: tertiaryPadding,
    paddingTop: tertiaryPadding,
    backgroundColor: 'white',
  },
});
