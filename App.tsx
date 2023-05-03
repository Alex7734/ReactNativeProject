import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView, StyleSheet,
} from 'react-native';
import AppNavigator from './src/modules/navigation/navigators/app-navigator';


function App(): JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
       <AppNavigator/>  
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default App;
