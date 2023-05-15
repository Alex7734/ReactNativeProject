import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LogBox, StyleSheet} from 'react-native';
import {HomeRoutes, HomeTabsParamList} from '../routes/home-routes';
import {HomeIcon, AccountIcon, FavoritesIcon} from '../../../assets/icons';
import AccountScreen from '../../account/screens/AccountScreen';
import {HomeScreen} from '../../openings/screens/HomeScreen';
import FavoritesScreen from '../../openings/screens/FavoritesScreen';
LogBox.ignoreAllLogs(true);

const Tab = createBottomTabNavigator<HomeTabsParamList>();

const HomeTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#E63946',
        tabBarStyle: styles.bottomTab,
        headerStyle: {
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: 2,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        },
        headerTitle: 'Chess Openings Explorer',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
          alignSelf: 'center',
        },
      }}>
      <Tab.Screen
        name={HomeRoutes.HOME}
        options={{
          tabBarIcon: () => <HomeIcon width={25} height={25} />,
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name={HomeRoutes.FAVORITES}
        options={{
          tabBarIcon: () => <FavoritesIcon width={25} height={25} />,
        }}
        component={FavoritesScreen}
      />
      <Tab.Screen
        name={HomeRoutes.ACCOUNT}
        options={({navigation}) => ({
          tabBarIcon: () => <AccountIcon width={25} height={25} />,
        })}
        component={AccountScreen}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottomTab: {
    elevation: 10,
    paddingBottom: 5,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    height: 60,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default HomeTabNavigator;
