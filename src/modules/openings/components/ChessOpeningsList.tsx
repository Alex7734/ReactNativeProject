import React from 'react';
import { Opening } from '../types';
import OpeningListItem from './OpeningListItem';
import { FlatList, ActivityIndicator } from 'react-native';

interface ChessOpeningsListProps {
  openings: Opening[];
  isLoading: boolean;
  onEndReached: () => void;
}

const ChessOpeningsList: React.FC<ChessOpeningsListProps> = ({ openings, isLoading, onEndReached }) => {
  const renderFooter = () => {
    if (!isLoading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  return (
    <FlatList
      style={{ width: '100%', padding: 5 }}
      data={openings}
      renderItem={({ item }) => <OpeningListItem opening={item} />}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={onEndReached}
      onEndReachedThreshold={0}
      ListFooterComponent={renderFooter()}
    />
  );
};

export default ChessOpeningsList;
