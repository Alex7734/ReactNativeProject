import React, {useCallback, useEffect, useState} from 'react';
import {useChessOpenings} from '../hooks/useChessOpeninigs';
import {Opening} from '../types';
import OpeningListItem from '../components/OpeningListItem';
import {
  FlatList,
  ActivityIndicator,
} from 'react-native';

interface ChessOpeningsListProps {
  searchValue: string;
  filters: {whiteOpening: boolean | null};
}

export const ChessOpeningsList: React.FC<ChessOpeningsListProps> = ({searchValue, filters}) => {
  const [page, setPage] = useState<number>(1);
  const {data: openings, isLoading, hasMore} = useChessOpenings(page, 10);
  const [filteredOpenings, setFilteredOpenings] = useState<Opening[]>([]);

  const onEndReached = () => {
    if (!hasMore) return;
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    let filtered = [...(openings || [])];

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
  }, [openings, searchValue, filters]);

  return (
    <>
      <FlatList
        style={{width: '100%', padding: 5}}
        data={filteredOpenings}
        renderItem={({item}) => <OpeningListItem opening={item} />}
        keyExtractor={item => item.id.toString()}
        onEndReached={onEndReached}
        onEndReachedThreshold={0}
      />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </>
  );
};
