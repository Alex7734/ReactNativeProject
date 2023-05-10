import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Opening } from '../types';
import { calculateDifficultyColor } from '../utils/calculateDifficultyLevel';
import { useNavigation } from '@react-navigation/native';
import { FavoritesIcon } from '../../../assets/icons';
import { useAuthStore } from '../../auth/store/useAuthStore';

type DetailsScreenProps = {
  route: {
    params: {
      opening: Opening;
    };
  };
};

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const { opening } = route.params;
  const navigation = useNavigation();
  const { currentUser, addFavoriteOpening, removeFavoriteOpening } = useAuthStore();
  const [isFavorite, setIsFavorite] = useState(currentUser?.favorites.includes(opening.name) ?? false);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteOpening(opening.name);
    } else {
      addFavoriteOpening(opening.name);
    }
    setIsFavorite(!isFavorite);
  };
  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
     <View style={styles.titleContainer}>
        <Pressable onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
        <Pressable onPress={toggleFavorite}>
          <FavoritesIcon width={40} height={40} fill={isFavorite ? '#E63946' : '#000'} />
        </Pressable>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: opening.photo }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{opening.name}</Text>
        <Text style={styles.description}>{opening.description}</Text>
        <Text style={styles.difficulty}>
          Difficulty: {calculateDifficultyColor(opening.difficultyLevel)}
        </Text>
        <Text style={styles.difficulty}>Played by:
              {opening.whiteOpening ? 'White' : 'Black'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    opacity: 0.9,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  textContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    marginTop: 16,
    marginBottom: 8,
    color: '#1D3557',
    fontSize: 28,
    fontWeight: 'bold',
  },
  description: {
    color: '#1D3557',
    fontSize: 16,
    marginBottom: 8,
  },
  difficulty: {
    color: '#1D3557',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#E63946',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});


export default DetailsScreen;
