import { useState, useEffect } from 'react';
import { Opening } from '../types';

const fetchChessOpenings = async (page = 1, limit = 10) => {
  const response = await fetch(
    `https://6453d40ae9ac46cedf30de1e.mockapi.io/chessOpenings?page=${page}&limit=${limit}`,
  );
  return await response.json();
};

export const useChessOpenings = () => {
  const [data, setData] = useState<Opening[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const fetchedData = await fetchChessOpenings();
      setData(fetchedData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return { data, isLoading };
};