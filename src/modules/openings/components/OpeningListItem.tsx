import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OpeningListItem = ({ opening }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{opening.name}</Text>
      <Text style={styles.moves}>{opening.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  moves: {
    fontSize: 14,
    color: '#777',
  },
});

export default OpeningListItem;
