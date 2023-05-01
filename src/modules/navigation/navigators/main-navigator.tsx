import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeTabNavigator from './home-navigator';
import {MainRoutes} from '../routes/main-routes';

export type MainParamList = {
  [MainRoutes.HOME_TABS]: undefined;
};

const Stack = createStackNavigator<MainParamList>();

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={MainRoutes.HOME_TABS} component={HomeTabNavigator} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
