import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import OpeningListItem from '../components/OpeningListItem';
import {useAuthStore} from '../../auth/store/useAuthStore';
import {useChessOpenings} from '../hooks/useChessOpeninigs';

const FavoritesScreen = () => {
  const {currentUser} = useAuthStore();
  const {data: allOpenings, isLoading} = useChessOpenings(1);
  if (isLoading || !currentUser || !allOpenings) {
    return <View><Text>Loading...</Text></View>;
  }

  const favoriteOpenings = allOpenings.filter(opening =>
    currentUser.favorites.includes(opening.name),
  );


  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteOpenings}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <OpeningListItem opening={item} favourite={true} />}
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
