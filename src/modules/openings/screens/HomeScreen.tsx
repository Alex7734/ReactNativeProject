import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import SearchBar from '../components/SearchBar';
import FilterModal from '../components/FilterModal';
import OpeningListItem from '../components/OpeningListItem';
import { Opening } from '../types';

export const HomeScreen: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [filters, setFilters] = useState<{ whiteOpening: boolean | null }>({
    whiteOpening: null,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [openings, setOpenings] = useState<Opening[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://6453d40ae9ac46cedf30de1e.mockapi.io/chessOpenings?page=${page}&limit=10`)
      const result = await response.json();
      setOpenings((prevData) => (prevData ? [...prevData, ...result] : result));
      setHasMore(result.length === 10);
      console.log(result)
      console.log(page)
    } catch (error) {
      setOpenings([]);
      setHasMore(false);
      console.log(page)
      console.log(error);
    } finally {
      console.log(openings)
      console.log(page)

      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = useCallback((searchText: string) => {
    setSearchValue(searchText);
  }, []);

  const handleFilter = useCallback(
    (newFilters: { whiteOpening: boolean | null }) => {
      setFilters(newFilters);
    },
    []
  );

  const handleEndReached = () => {
    if (!hasMore) return;
    setPage((prevPage) => prevPage + 1);
  };

  const filteredOpenings = openings.filter((opening) => {
    if (searchValue && !opening.name.toLowerCase().includes(searchValue.toLowerCase())) {
      return false;
    }
    if (filters.whiteOpening !== null && opening.whiteOpening !== filters.whiteOpening) {
      return false;
    }
    return true;
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchAndFilterContainer}>
        <View style={styles.alignLeft}>
          <SearchBar onSearch={handleSearch} />
        </View>
        <Pressable style={styles.filterButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.filterButtonText}>Filters</Text>
        </Pressable>
      </View>
      <FlatList
        style={styles.flatList}
        data={filteredOpenings}
        renderItem={({ item }) => <OpeningListItem opening={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={handleEndReached}
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
    backgroundColor: '#F5F5F5',
  },
  filterButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
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
    marginHorizontal: 16,
    marginVertical: 12,
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
