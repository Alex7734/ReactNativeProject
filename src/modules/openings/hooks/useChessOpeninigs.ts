import {useState, useEffect} from 'react';
import {Opening} from '../types';

const useChessOpenings = (page: number, limit: number) => {
  const [data, setData] = useState<Opening[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let param = `?page=${page}&limit=${limit}`
        if (limit === -1)
          param = ``
        const response = await fetch(`https://6453d40ae9ac46cedf30de1e.mockapi.io/chessOpenings` + param);
        const result = await response.json();
        setData(prevData => (prevData ? [...prevData, ...result] : result)); 
        setHasMore(result.length === limit); 
      } catch (error) {
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
