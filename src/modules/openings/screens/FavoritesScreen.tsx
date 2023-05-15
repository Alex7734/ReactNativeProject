import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import OpeningListItem from '../components/OpeningListItem';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { Opening } from '../types';

const FavoritesScreen = () => {
  const { currentUser } = useAuthStore();
  const [allOpenings, setAllOpenings] = useState<Opening[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          'https://6453d40ae9ac46cedf30de1e.mockapi.io/chessOpenings'
        );
        const result = await response.json();
        setAllOpenings(result);
      } catch (error) {
        setAllOpenings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading || !currentUser || !allOpenings) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const favoriteOpenings = allOpenings.filter((opening) =>
    currentUser.favorites.includes(opening.name)
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteOpenings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <OpeningListItem opening={item} favourite={true} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
});

export default FavoritesScreen;
