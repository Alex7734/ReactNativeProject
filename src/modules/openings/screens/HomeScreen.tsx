import React, {useCallback, useState} from 'react';
import SearchBar from '../components/SearchBar';
import FilterModal from '../components/FilterModal';
import {ChessOpeningsList} from '../components/ChessOpeningsList';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';

export const HomeScreen: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filters, setFilters] = useState<{whiteOpening: boolean | null}>({
    whiteOpening: null,
  });
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = useCallback((searchText: string) => {
    setSearchValue(searchText);
  }, []);

  const handleFilter = useCallback(
    (newFilters: {whiteOpening: boolean | null}) => {
      setFilters(newFilters);
    },
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchAndFilterContainer}>
        <View style={styles.alignLeft}>
          <SearchBar onSearch={handleSearch} />
        </View>
        <Pressable
          style={styles.filterButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.filterButtonText}>Filters</Text>
        </Pressable>
      </View>
      <ChessOpeningsList searchValue={searchValue} filters={filters} />      
      <FilterModal
        visible={modalVisible}
    
        onFilter={handleFilter}
        onRequestClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    height: 40,
  },
  filterButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchAndFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  alignLeft: {
    flex: 4,
  },
  alignRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  flatList: {
    width: '100%',
    padding: 5,
  },
});
