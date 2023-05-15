import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {Opening} from '../types';
import {calculateDifficultyColor} from '../utils/calculateDifficultyLevel';
import { useNavigation } from '@react-navigation/native';
import { FavoritesIcon, FavoritesIconFilled } from '../../../assets/icons';
import { useAuthStore } from '../../auth/store/useAuthStore';
import { MainRoutes } from '../../navigation/routes/main-routes';
import { MyImage } from './MyImage';

type OpeningListItemProps = {
  opening: Opening;
  favourite?: boolean;
};

const OpeningListItem = ({opening, favourite} : OpeningListItemProps) => {
  const navigation = useNavigation();
  const { currentUser, removeFavoriteOpening, addFavoriteOpening } = useAuthStore();

  const handlePress = () => {
    navigation.navigate(MainRoutes.DETAILS, {opening});
  };

  const isFavorite = currentUser?.favorites.includes(opening.name);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteOpening(opening.name);
    } else {
      addFavoriteOpening(opening.name);
    }
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <MyImage uri={opening.photo}/>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{opening.name}</Text>
          <Text style={styles.description}>{opening.description}</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Difficulty:</Text>
            <Text style={styles.value}>{calculateDifficultyColor(opening.difficultyLevel)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Played by:</Text>
            <Text style={styles.value}>
              {opening.whiteOpening ? 'White' : 'Black'}
            </Text>
          </View>
        </View>
        { favourite && (
        <Pressable onPress={handleToggleFavorite}>
          {isFavorite ? <FavoritesIconFilled width={40} height={40} /> : <FavoritesIcon width={40} height={40} />}
        </Pressable>)}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 16,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#1D3557',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#1D3557',
  },
  value: {
    fontSize: 12,
    color: '#888', 
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 'auto',
  },
});

export default OpeningListItem;

