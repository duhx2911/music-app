import {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  TextInput,
  View,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {AuthContext} from '../context';
import BottomModalComponent from '../component/page/player/BottomModal';
import RecommendComponent from '../component/page/search/Recommend';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import SuggestSearchComponent from '../component/page/search/Suggest';
import ResultSearchComponent from '../component/page/search/Result';

enum Status {
  Typing,
  EndTyping,
  None,
}

const SearchScreen = () => {
  const {currentTrack, setSearchVal, searchVal} = useContext(AuthContext);
  const [keysearch, setKeySearch] = useState('');
  const [status, setStatus] = useState(Status.None);
  const handleStatus = (keysearch: string) => {
    setStatus(Status.None);
    setKeySearch(keysearch);
    // console.log('test: 1');
  };
  useEffect(() => {
    if (keysearch && keysearch.length) {
      (async () => {
        let res = await axios.post('/music/search', {keysearch: keysearch});
        let data = res && res.data.data ? res.data.data : [];
        setSearchVal(data);
        // console.log('Data:', data);
      })();
    } else {
      setSearchVal(null);
    }
  }, [keysearch]);
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            columnGap: 10,
            paddingBottom: 10,
            backgroundColor: '#fff',
            borderBottomColor: '#d5d5d5',
            borderBottomWidth: 0.7,
            padding: 10,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 1.0,
          }}>
          <TextInput
            placeholder="Tìm kiếm bài hát, nghệ sĩ"
            value={keysearch}
            onChangeText={value => {
              setKeySearch(value);
            }}
            onFocus={() => setStatus(Status.Typing)}
            style={{
              backgroundColor: '#e1e1e1',
              flex: 1,
              height: 40,
              borderRadius: 20,
              paddingLeft: 10,
            }}
          />
          <Pressable
            onPress={() => setStatus(Status.EndTyping)}
            style={{
              backgroundColor: '#0063ec',
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Ionicons name="search" size={24} color={'#fff'} />
          </Pressable>
        </View>
        <View style={{padding: 10}}>
          {searchVal &&
          (status === Status.EndTyping || status === Status.None) ? (
            <ResultSearchComponent />
          ) : status === Status.Typing && searchVal ? (
            <SuggestSearchComponent handleStatus={handleStatus} />
          ) : (
            <RecommendComponent handleStatus={handleStatus} />
          )}
        </View>
      </ScrollView>
      {currentTrack && <BottomModalComponent />}
    </SafeAreaView>
  );
};
export default SearchScreen;
