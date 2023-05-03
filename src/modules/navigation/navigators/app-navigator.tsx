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
import { useAuthStore } from '../../auth/store/useAuthStore';

export type AppParamList = {
  [AuthRoutes.AUTH]: undefined;
  [MainRoutes.HOME]: undefined;
};

export type AppNavProps = {
  navigation: StackNavigationProp<AppParamList>;
  route: RouteProp<AppParamList>;
};

const Stack = createStackNavigator<AppParamList>();

const AppNavigator: React.FC = () => {
  const {currentUser} = useAuthStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {currentUser?.id ? (
        <Stack.Screen name={MainRoutes.HOME} component={MainNavigator} />
      ) : (
        <Stack.Screen name={AuthRoutes.AUTH} component={AuthNavigator} options={{
          headerShown: false
        }} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
