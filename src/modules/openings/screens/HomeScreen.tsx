import React, {useCallback, useEffect, useState} from 'react';
import {useChessOpenings} from '../hooks/useChessOpeninigs';
import {Opening} from '../types';
import SearchBar from '../components/SearchBar';
import OpeningListItem from '../components/OpeningListItem';
import FilterModal from '../components/FilterModal';
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  View,
  Pressable,
  Text,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export const HomeScreen: React.FC = () => {
  const {data: openings, isLoading} = useChessOpenings();
  const [filteredOpenings, setFilteredOpenings] = useState<Opening[]>([]);
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

  useEffect(() => {
    if (openings) {
      let filtered = openings;

      if (searchValue) {
        filtered = filtered.filter((opening: {name: string}) =>
          opening.name.toLowerCase().includes(searchValue.toLowerCase()),
        );
      }

      if (filters.whiteOpening !== null) {
        filtered = filtered.filter(
          (opening: {whiteOpening: boolean | null}) =>
            opening.whiteOpening === filters.whiteOpening,
        );
      }

      setFilteredOpenings(filtered);
    }
  }, [openings, searchValue, filters]);

  return (
    <ScrollView>
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
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={filteredOpenings}
          renderItem={({item}) => <OpeningListItem opening={item} />}
          keyExtractor={item => item.id.toString()}
        />
      )}
      <FilterModal
        visible={modalVisible}
        onFilter={handleFilter}
        onRequestClose={() => setModalVisible(false)}
      />
    </ScrollView>
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
  }

});
