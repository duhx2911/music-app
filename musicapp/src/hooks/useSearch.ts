import {useState, useEffect} from 'react';
import axios from 'axios';
const useSearch = (url: string, body: {keysearch: string}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      let res = await axios.post(url, body);
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
export default useSearch;
