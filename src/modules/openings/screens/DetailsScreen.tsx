import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {Opening} from '../types';
import {calculateDifficultyColor} from '../utils/calculateDifficultyLevel';
import {useNavigation} from '@react-navigation/native';
import {FavoritesIcon, FavoritesIconFilled} from '../../../assets/icons';
import {useAuthStore} from '../../auth/store/useAuthStore';
import Animated, {BounceInDown, BounceInRight, BounceInUp} from 'react-native-reanimated';

type DetailsScreenProps = {
  route: {
    params: {
      opening: Opening;
    };
  };
};

const DetailsScreen: React.FC<DetailsScreenProps> = ({route}) => {
  const {opening} = route.params;
  const navigation = useNavigation();
  const {currentUser, addFavoriteOpening, removeFavoriteOpening} =
    useAuthStore();
  const [isFavorite, setIsFavorite] = useState(
    currentUser?.favorites.includes(opening.name) ?? false,
  );

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
      {opening.name === 'Giucco Piano: Evans Gambit' ? (
        <Image
          source={require('../../../assets/images/evans.png')}
          style={styles.image}
        />
      ) : opening.name === 'Caro Kann Defense' ? (
        <Image
          source={require('../../../assets/images/caro-kann.png')}
          style={styles.image}
        />
      ) : opening.name === 'Sicilian Defense: Najdorf Variation' ? (
        <Image
          source={require('../../../assets/images/najdorf.png')}
          style={styles.image}
        />
      ) : (
        <Image source={{uri: opening.photo}} style={styles.image} />
      )}
      <Pressable onPress={handlePress} style={styles.backButton}>
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>
      <Pressable onPress={toggleFavorite} style={styles.favoriteButton}>
        {isFavorite ? (
          <Animated.View key={1} entering={BounceInRight} > 
            <FavoritesIconFilled width={40} height={40} />
          </Animated.View>
        ) : (
          <Animated.View key={2} entering={BounceInUp} >
            <FavoritesIcon width={40} height={40} />
          </Animated.View>
        )}
      </Pressable>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{opening.name}</Text>
        <Text style={styles.description}>{opening.description}</Text>
        <Text style={styles.difficulty}>
          Difficulty: {calculateDifficultyColor(opening.difficultyLevel)}
        </Text>
        <Text style={styles.difficulty}>
          Played by: {opening.whiteOpening ? 'White' : 'Black'}
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
  image: {
    flex: 1,
    resizeMode: 'cover',
    opacity: 0.9,
  },
  imageFit: {
    flex: 1,
    resizeMode: 'contain',
    opacity: 0.9,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#E63946',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    zIndex: 1,
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  textContainer: {
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    marginTop: 16,
    marginBottom: 8,
    color: '#1D3557',
    fontSize: 24,
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
});

export default DetailsScreen;
