import {StackNavigationProp} from '@react-navigation/stack';
import {AuthRoutes} from '../../auth/navigation/routes/auth-routes';
import {MainRoutes} from './main-routes';
import {RouteProp} from '@react-navigation/native';

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
