import {Pressable, StyleSheet, Text, View} from 'react-native';

import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {AuthContext} from '../../../context';
const recommendKey = [
  {
    id: 1,
    key: 'Sơn Tùng M-TP',
  },
  {
    id: 2,
    key: 'Nơi này có anh',
  },
  {
    id: 3,
    key: 'Alone',
  },
  {
    id: 4,
    key: 'Bản nhạc cuối',
  },
];
const RecommendComponent = ({handleStatus}: any) => {
  const [keysearch, setKey] = useState('');
  const {setSearchVal} = useContext(AuthContext);
  useEffect(() => {
    if (keysearch && keysearch.length) {
      (async () => {
        let res = await axios.post('/music/search', {keysearch: keysearch});
        let data = res && res.data.data ? res.data.data : [];
        setSearchVal(data);
      })();
    }
  }, [keysearch]);

  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '500',
          color: '#000',
          marginBottom: 10,
        }}>
        Đề xuất cho bạn
      </Text>
      <View style={styles.recommend}>
        {recommendKey.map(item => {
          return (
            <Pressable
              key={item.id}
              style={styles.recommendItem}
              onPress={() => {
                setKey(item.key);
                handleStatus(item.key);
              }}>
              <Text>{item.key}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  recommend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  recommendItem: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#e1e1e1',
    borderRadius: 15,
  },
});
export default RecommendComponent;
