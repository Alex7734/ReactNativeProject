import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainRoutes} from '../routes/main-routes';
import {LogBox, StyleSheet, View} from 'react-native';
import {HomeTabsParamList} from '../routes/home-routes';
import {HomeIcon, AccountIcon, FavoritesIcon} from '../../../assets/icons';
LogBox.ignoreAllLogs(true);

const Tab = createBottomTabNavigator<HomeTabsParamList>();

const HomeTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarStyle: styles.bottomTab
      }}
    >
      <Tab.Screen
        name={MainRoutes.HOME}
        options={{
          tabBarIcon: () => <HomeIcon width={25} height={25} />,
        }}
        component={() => <View style={{backgroundColor: 'red'}}></View>}
      />
      <Tab.Screen
        name={MainRoutes.FAVORITES}
        options={{
          tabBarIcon: () => <FavoritesIcon width={25} height={25} />,
        }}
        component={() => <View style={{backgroundColor: 'blue'}}></View>}
      />
      <Tab.Screen
        name={MainRoutes.ACCOUNT}
        options={{
          tabBarIcon: () => <AccountIcon width={25} height={25} />,
        }}
        component={() => <View style={{backgroundColor: 'green'}}></View>}
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
  }
})

export default HomeTabNavigator;
