import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { Avatar } from '../components/Avatar';
import PreferredOpenings from '../components/PreferredOpenings';
import { useNavigation } from '@react-navigation/native';
import { MainRoutes } from '../../navigation/routes/main-routes';

const AccountScreen = () => {
  const {
    currentUser,
    addPreferredOpening,
    removePreferredOpening,
    logout,
  } = useAuthStore();
  const navigation = useNavigation();

  const handleLogout = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.profileContainer}>
          <Avatar user={currentUser} />
          <Text style={styles.username}>{currentUser?.username}</Text>
          <Text style={styles.email}>{currentUser?.email}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <Pressable
            onPress={() => navigation.navigate(MainRoutes.EDIT)}
            style={styles.editButton}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </Pressable>
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.preferredOpeningsContainer}>
        <PreferredOpenings
          preferredOpenings={currentUser?.prefferedOpenings}
          addPreferredOpening={addPreferredOpening}
          removePreferredOpening={removePreferredOpening}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: '#F5F5F5',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#1D3557',
  },
  email: {
    fontSize: 16,
    color: '#1D3557',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  preferredOpeningsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccountScreen;
