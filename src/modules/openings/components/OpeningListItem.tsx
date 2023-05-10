import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {Opening} from '../types';
import {calculateDifficultyColor} from '../utils/calculateDifficultyLevel';
import { useNavigation } from '@react-navigation/native';
import { MainRoutes } from '../../navigation/routes/main-routes';

type OpeningListItemProps = {
  opening: Opening;
};

const OpeningListItem = ({opening} : OpeningListItemProps) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(MainRoutes.DETAILS, {opening});
  };


  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        <Image source={{uri: opening.photo}} style={styles.photo} />
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
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  value: {
    fontSize: 12,
  },
});

export default OpeningListItem;
