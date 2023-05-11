import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
} from 'react-native';

interface FilterModalProps {
  onFilter: (newFilters: { whiteOpening: boolean | null }) => void;
  visible: boolean;
  onRequestClose: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  onFilter,
  visible,
  onRequestClose,
}) => {
  const [whiteOpening, setWhiteOpening] = useState<boolean | null>(null);

  const handleApplyFilters = () => {
    onFilter({ whiteOpening });
  };

  useEffect(() => {
    handleApplyFilters();
  }, [whiteOpening]);

  const handleBothOpeningToggle = () => {
    setWhiteOpening(null);
  };

  const handleWhiteOpeningToggle = () => {
    setWhiteOpening(true);
  };

  const handleBlackOpeningToggle = () => {
    setWhiteOpening(false);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onRequestClose}
    >
      <Pressable
        style={styles.overlay}
        onPress={onRequestClose}
      >
        <View style={styles.modalContainer}>
          <Pressable style={styles.filter} onPress={handleBothOpeningToggle}>
            <Text>Both Colors</Text>
            <Text>{whiteOpening === null ? '✔' : '✘'}</Text>
          </Pressable>
          <Pressable style={styles.filter} onPress={handleWhiteOpeningToggle}>
            <Text>White Opening</Text>
            <Text>{whiteOpening === true ? '✔' : '✘'}</Text>
          </Pressable>
          <Pressable style={styles.filter} onPress={handleBlackOpeningToggle}>
            <Text>Black Opening</Text>
            <Text>{whiteOpening === false ? '✔' : '✘'}</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  filter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});


export default FilterModal;
