import {useContext} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../../context';
import TrackPlayer from 'react-native-track-player';
import {Song} from '../../../constants';

const ResultSearchComponent = () => {
  const {searchVal, setCurrentTrack, setCurrentIndex, setupPlayer} =
    useContext(AuthContext);
  return (
    <ScrollView>
      {searchVal &&
        searchVal.map((item: Song, index: number) => {
          return (
            <Pressable
              key={item.id}
              onPress={async () => {
                await setupPlayer(searchVal);
                await TrackPlayer.pause();
                await TrackPlayer.skip(index);
                await TrackPlayer.play();
                const trackObject = await TrackPlayer.getTrack(index);
                setCurrentTrack(trackObject);
                setCurrentIndex(index);
              }}
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
    </ScrollView>
  );
};
export default ResultSearchComponent;
