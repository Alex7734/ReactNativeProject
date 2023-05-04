import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainRoutes} from '../routes/main-routes';
import {LogBox, Pressable, StyleSheet, Text, View} from 'react-native';
import {HomeRoutes, HomeTabsParamList} from '../routes/home-routes';
import {HomeIcon, AccountIcon, FavoritesIcon} from '../../../assets/icons';
import AccountScreen from '../../account/screens/AccountScreen';
import EditUserScreen from '../../account/screens/EditUserScreen';
import { useNavigation } from '@react-navigation/native';
import { HomeScreen } from '../../openings/screens/HomeScreen';
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
        component={() => <View style={{backgroundColor: 'blue'}}></View>}
      />
      <Tab.Screen
        name={HomeRoutes.ACCOUNT}
        options={({navigation}) => ({
          tabBarIcon: () => <AccountIcon width={25} height={25} />,
          headerRight: () => <Pressable 
              onPress={() => navigation.navigate(MainRoutes.EDIT)}
            style={({pressed}) => ({ borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: 'pink', width: 50, height: 30, opacity: pressed ? 0.6 : 1, justifyContent: 'center', alignItems: 'center'})}>
            <Text>Edit</Text></Pressable>,
          
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
  }
})

export default HomeTabNavigator;
