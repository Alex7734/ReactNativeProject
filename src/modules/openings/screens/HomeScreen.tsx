import React, {useCallback, useEffect, useState} from 'react';
import {useChessOpenings} from '../hooks/useChessOpeninigs';
import {Opening} from '../types';
import SearchBar from '../components/SearchBar';
import OpeningListItem from '../components/OpeningListItem';
import FilterModal from '../components/FilterModal';
import {
  FlatList,
  ActivityIndicator,
  StyleSheet,
  View,
  Pressable,
  Text,
} from 'react-native';

export const HomeScreen: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const {data: openings, isLoading, hasMore} = useChessOpenings(page);
  const [filteredOpenings, setFilteredOpenings] = useState<Opening[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filters, setFilters] = useState<{whiteOpening: boolean | null}>({
    whiteOpening: null,
  });
  const [reachedEnd, setReachedEnd] = useState<boolean>(false); 
  const [modalVisible, setModalVisible] = useState(false);

  const onEndReached = () => {
    if (reachedEnd) return;
    setPage(prevPage => prevPage + 1);
  };

  const handleSearch = useCallback((searchText: string) => {
    setSearchValue(searchText);
  }, []);

  const handleFilter = useCallback(
    (newFilters: {whiteOpening: boolean | null}) => {
      setFilters(newFilters);
    },
    [filters],
  );

  useEffect(() => {
    if (openings) {
      setFilteredOpenings(openings);
    }
  }, [openings]);

  useEffect(() => {
    if (openings) {
      let filtered = [...openings];

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

  useEffect(() => {
    setReachedEnd(!hasMore);
  }, [hasMore]);

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
      <FlatList
        style={styles.flatList}
        data={filteredOpenings}
        renderItem={({item}) => <OpeningListItem opening={item} />}
        keyExtractor={item => item.id.toString()}
        onEndReached={onEndReached}
        onEndReachedThreshold={0}
      />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
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
