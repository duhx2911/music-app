import {useContext, useEffect, useState} from 'react';
import {Text, Pressable, StyleSheet, Image} from 'react-native';
import {AuthContext} from '../../../context';
import {View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer from 'react-native-track-player';
import {Song} from '../../../constants';

const SuggestSearchComponent = ({handleStatus}: any) => {
  const {searchVal, setCurrentTrack, setCurrentIndex, setupPlayer} =
    useContext(AuthContext);
  const [dataSuggest, setDataSuggest] = useState([]);
  useEffect(() => {
    setDataSuggest(searchVal.slice(0, 5));
  }, [searchVal]);
  //   console.log(dataSuggest);

  return (
    <View>
      <View>
        {searchVal && searchVal[0] && (
          <Pressable
            style={styles.keySuggest}
            onPress={() => handleStatus(searchVal[0].title)}>
            <Text>{searchVal[0].title}</Text>
          </Pressable>
        )}
        {searchVal && searchVal[1] && (
          <Pressable
            style={styles.keySuggest}
            onPress={() => handleStatus(searchVal[1].title)}>
            <Text>{searchVal[1].title}</Text>
          </Pressable>
        )}
        {searchVal && searchVal[0] && (
          <Pressable
            style={styles.keySuggest}
            onPress={() => handleStatus(searchVal[0].artist)}>
            <Text>{searchVal[0].artist}</Text>
          </Pressable>
        )}
        {searchVal && searchVal[1] && (
          <Pressable
            style={styles.keySuggest}
            onPress={() => handleStatus(searchVal[1].artist)}>
            <Text>{searchVal[1].artist}</Text>
          </Pressable>
        )}
        {!searchVal.length && <Text>Không tìm thấy kết quả.</Text>}
      </View>
      <View style={{marginTop: 20}}>
        {dataSuggest &&
          dataSuggest.map((item: Song, index) => {
            return (
              <Pressable
                onPress={async () => {
                  await setupPlayer(searchVal);
                  await TrackPlayer.pause();
                  await TrackPlayer.skip(index);
                  await TrackPlayer.play();
                  const trackObject = await TrackPlayer.getTrack(index);
                  setCurrentTrack(trackObject);
                  setCurrentIndex(index);
                }}
                key={item.id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    columnGap: 10,
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: item.artwork}}
                    style={{width: 50, height: 50, borderRadius: 8}}
                  />
                  <View>
                    <Text
                      style={{
                        color: '#000',
                        fontSize: 16,
                        fontWeight: '500',
                      }}>
                      {item.title}
                    </Text>
                    <Text>{item.artist}</Text>
                  </View>
                </View>
                <Ionicons
                  name="ellipsis-horizontal"
                  size={24}
                  color={'#828282'}
                />
              </Pressable>
            );
          })}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  keySuggest: {
    borderBottomColor: '#e1e1e1',
    borderBottomWidth: 0.7,
    paddingVertical: 10,
  },
});
export default SuggestSearchComponent;
