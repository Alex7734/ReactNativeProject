import React from 'react';
import {RouteProp} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import AuthNavigator from '../../auth/navigation/navigators/auth-navigator';
import MainNavigator from './main-navigator';
import {MainRoutes} from '../routes/main-routes';
import {AuthRoutes} from '../../auth/navigation/routes/auth-routes';

export type AppParamList = {
  [AuthRoutes.AUTH]: undefined;
  [MainRoutes.HOME]: undefined;
};

export type AppNavProps = {
  navigation: StackNavigationProp<AppParamList>;
  route: RouteProp<AppParamList>;
};

interface AppNavigatorProps {
  isLoggedIn: boolean;
}

const Stack = createStackNavigator<AppParamList>();

const AppNavigator: React.FC<AppNavigatorProps> = ({isLoggedIn}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isLoggedIn ? (
        <Stack.Screen name={MainRoutes.HOME} component={MainNavigator} />
      ) : (
        <Stack.Screen name={AuthRoutes.AUTH} component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
