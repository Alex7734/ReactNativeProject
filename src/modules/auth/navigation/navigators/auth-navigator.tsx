import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthRoutes } from '../routes/auth-routes';
import { View } from 'react-native';
import { LoginScreen } from '../../screens/LoginScreen';

export type AuthParamList = {
  [AuthRoutes.LOGIN]: undefined;
  [AuthRoutes.SIGNUP]: undefined;
}

const Stack = createStackNavigator<AuthParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={AuthRoutes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={AuthRoutes.SIGNUP} component={()=><View style={{backgroundColor: 'yellow'}}></View>}/>
    </Stack.Navigator>
  );
};

export default AuthNavigator;