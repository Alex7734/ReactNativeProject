import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthRoutes } from '../routes/auth-routes';
import { View } from 'react-native';

export type AuthParamList = {
  [AuthRoutes.LOGIN]: undefined;
  [AuthRoutes.SIGNUP]: undefined;
}

const Stack = createStackNavigator<AuthParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={AuthRoutes.LOGIN} component={()=><View style={{backgroundColor: 'black'}}></View>} />
      <Stack.Screen name={AuthRoutes.SIGNUP} component={()=><View style={{backgroundColor: 'yellow'}}></View>}/>
    </Stack.Navigator>
  );
};

export default AuthNavigator;