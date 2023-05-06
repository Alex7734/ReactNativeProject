import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
} from 'react-native';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { Avatar } from '../components/Avatar';
import PreferredOpenings from '../components/PreferredOpenings';

const AccountScreen = () => {
  const [newPreferredOpening, setNewPreferredOpening] = useState('');
  const currentUser = useAuthStore((state) => state.currentUser);
  const addPreferredOpening = useAuthStore((state) => state.addPreferredOpening);
  const removePreferredOpening = useAuthStore((state) => state.removePreferredOpening);
  const handleLogout = () => useAuthStore.getState().logout();

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Avatar user={currentUser} />
        <Text style={styles.username}>{currentUser?.username}</Text>
        <Text style={styles.email}>{currentUser?.email}</Text>
        <View style={styles.buttonsContainer}>
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
        </View>
      </View>
      <PreferredOpenings
        preferredOpenings={currentUser?.prefferedOpenings}
        addPreferredOpening={addPreferredOpening}
        removePreferredOpening={removePreferredOpening}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  cardContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    width: '100%',
    marginBottom: 20,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    width: 100,
  },
});

export default AccountScreen;
