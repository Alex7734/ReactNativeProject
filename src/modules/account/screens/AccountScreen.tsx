import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { Avatar } from '../components/Avatar';

const AccountScreen = () => {
  const currentUser = useAuthStore(state => state.currentUser);

  const handleLogout = () => useAuthStore.getState().logout();


  return (
    <View style={styles.container}>
      <Avatar user={currentUser} />
      <Text style={styles.username}>{currentUser?.username}</Text>
      <Text style={styles.email}>{currentUser?.email}</Text>
      <View style={styles.favoritesContainer}>
        <Text style={styles.sectionTitle}>Favorites</Text>
        {currentUser?.favorites.map((favorite, index) => (
          <View style={styles.favoriteItem} key={index}>
            <Text style={styles.favoriteText}>{favorite}</Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
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
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
  },
  favoritesContainer: {
    marginTop: 20,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  favoriteText: {
    fontSize: 16,
    marginLeft: 10,
  }
});

export default AccountScreen;