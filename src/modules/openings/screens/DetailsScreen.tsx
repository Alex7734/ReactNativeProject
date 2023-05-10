import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Opening } from '../types';
import { calculateDifficultyColor } from '../utils/calculateDifficultyLevel';
import { useNavigation } from '@react-navigation/native';

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

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: opening.photo }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{opening.name}</Text>
        <Text style={styles.description}>{opening.description}</Text>
        <Text style={styles.difficulty}>
          Difficulty: {calculateDifficultyColor(opening.difficultyLevel)}
        </Text>
        <Pressable onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  difficulty: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default DetailsScreen;
