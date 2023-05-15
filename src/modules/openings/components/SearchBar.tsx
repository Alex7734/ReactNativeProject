import React, { useCallback } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useDebounce } from 'use-debounce';

interface SearchBarProps {
  onSearch: (searchText: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = React.useState('');
  const [debouncedSearchText] = useDebounce(searchText, 500);

  const handleSearch = useCallback(() => {
    onSearch(debouncedSearchText);
  }, [debouncedSearchText, onSearch]);

  React.useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search chess openings..."
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default SearchBar;
