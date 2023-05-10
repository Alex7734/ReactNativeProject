import {useState, useEffect} from 'react';
import {Opening} from '../types';

const useChessOpenings = (page: number) => {
  const [data, setData] = useState<Opening[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://6453d40ae9ac46cedf30de1e.mockapi.io/chessOpenings?page=${page}&limit=${limit}`);
        const result = await response.json();
        setData(prevData => (prevData ? [...prevData, ...result] : result)); 
        setHasMore(result.length === limit); 
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]);

  return {data, isLoading, hasMore}; 
};

export {useChessOpenings};
