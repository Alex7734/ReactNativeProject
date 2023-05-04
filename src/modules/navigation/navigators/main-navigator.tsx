import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeTabNavigator from './home-navigator';
import {MainRoutes} from '../routes/main-routes';
import EditUserScreen from '../../account/screens/EditUserScreen';

export type MainParamList = {
  [MainRoutes.HOME_TABS]: undefined;
  [MainRoutes.EDIT]: undefined;
};

const Stack = createStackNavigator<MainParamList>();

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={MainRoutes.HOME_TABS} component={HomeTabNavigator} />
      <Stack.Screen name={MainRoutes.EDIT} component={EditUserScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
