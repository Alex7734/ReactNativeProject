import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeTabNavigator from './home-navigator';
import {MainRoutes} from '../routes/main-routes';
import EditUserScreen from '../../account/screens/EditUserScreen';
import DetailsScreen from '../../openings/screens/DetailsScreen';
import { Opening } from '../../openings/types';

export type MainParamList = {
  [MainRoutes.HOME_TABS]: undefined;
  [MainRoutes.EDIT]: undefined;
  [MainRoutes.DETAILS]: { opening: Opening };
};

const Stack = createStackNavigator<MainParamList>();
const MainNavigator = () => {  
  const forFade = ({ current }: any) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={MainRoutes.HOME_TABS} component={HomeTabNavigator} />
      <Stack.Screen name={MainRoutes.EDIT} component={EditUserScreen}  options={{ cardStyleInterpolator: forFade }} />
      <Stack.Screen name={MainRoutes.DETAILS} component={DetailsScreen}  options={{ cardStyleInterpolator: forFade }} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
