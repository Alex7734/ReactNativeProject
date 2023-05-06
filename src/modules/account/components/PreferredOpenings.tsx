import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, StyleSheet, ScrollView } from 'react-native';

interface PreferredOpeningsProps {
  preferredOpenings: string[] | undefined;
  addPreferredOpening: (opening: string) => void;
  removePreferredOpening: (opening: string) => void;
}

const PreferredOpenings = ({ preferredOpenings, addPreferredOpening, removePreferredOpening }: PreferredOpeningsProps) => {
  const [newPreferredOpening, setNewPreferredOpening] = useState('');

  const handleAddPreferredOpening = () => {
    if (newPreferredOpening.trim()) {
      addPreferredOpening(newPreferredOpening);
      setNewPreferredOpening('');
    }
  };

  // excuse the inline styles, I'm lazy and this is just a demo to test the centring of the ScrollView
  return (
    <ScrollView style={{width: '90%', margin: 10, padding: -10, marginHorizontal: 0, marginRight: -10}}> 
    <View style={styles.preferredOpeningsContainer}>
      <Text style={styles.sectionTitle}>My Preferred Openings</Text>
      <View style={styles.preferredOpeningInputContainer}>
        <TextInput
          style={styles.inputPreferredOpening}
          placeholder="Type a preferred opening"
          value={newPreferredOpening}
          onChangeText={setNewPreferredOpening}
        />
        <Pressable
          style={styles.addButton}
          onPress={handleAddPreferredOpening}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      {preferredOpenings?.map((opening, index) => (
        <View style={styles.preferredOpening} key={index}>
          <Text style={styles.preferredOpeningText}>{opening}</Text>
          <Pressable
            style={styles.deleteButton}
            onPress={() => removePreferredOpening(opening)}>
            <Text style={styles.deleteButtonText}>x</Text>
          </Pressable>
        </View>
      ))}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  preferredOpeningsContainer: {
    margin: 10,
    marginTop: 0,
    width: '90%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  preferredOpeningInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  preferredOpening: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: '#E5E5EA',
    padding: 10,
    borderRadius: 5,
  },
  preferredOpeningText: {
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
  inputPreferredOpening: {
    flex: 1,
    height: 40,
    borderColor: '#C7C7CC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PreferredOpenings;
