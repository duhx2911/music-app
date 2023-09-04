import {useState, useEffect} from 'react';
import {getAPI} from '../api';
const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      let res = await getAPI({
        path: url,
      });
      let data = res && res.data ? res.data : [];
      setData(data);
      setLoading(false);
    })();
  }, []);

  return {
    data,
    loading,
  };
};
export default useFetch;
