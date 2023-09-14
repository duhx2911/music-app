import {useNavigation} from '@react-navigation/native';
import {
  Image,
  Text,
  View,
  Pressable,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'react-native-linear-gradient';
import {Avatar} from '@rneui/themed';
import useFetch from '../hooks/useFetch';
import {useContext, useEffect} from 'react';
import {AuthContext} from '../context';

import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';

import BottomModalComponent from '../component/page/player/BottomModal';

const NewReleaseScreen = ({route}: any) => {
  const {genreID} = route.params;
  const {data: dataMusic} = useFetch(`/genre/${genreID}`);
  const {
    currentTrack,
    setCurrentTrack,
    currentIndex,
    setCurrentIndex,
    setupPlayer,
  } = useContext(AuthContext);
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const navigation = useNavigation();

  // useEffect(() => {
  //   setupPlayer(dataMusic);
  // }, [dataMusic]);
  useEffect(() => {
    (async () => {
      if (State.Playing === playbackState) {
        if (progress.position.toFixed(0) === progress.duration.toFixed(0)) {
          if (currentIndex < dataMusic.length) {
            setCurrentIndex(currentIndex + 1);
            const trackObject = await TrackPlayer.getTrack(currentIndex + 1);
            setCurrentTrack(trackObject);
          } else {
            setCurrentIndex(0);
            const trackObject = await TrackPlayer.getTrack(0);
            setCurrentTrack(trackObject);
          }
        }
      }
    })();
  }, [progress]);
  return (
    <>
      <View style={{backgroundColor: '#fff', flex: 1, flexGrow: 1}}>
        <LinearGradient
          colors={['#88d3ce', '#6e45e2']}
          style={{
            height: 300,

            padding: 10,
          }}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={'#fff'}
            onPress={() => navigation.goBack()}
          />
          <View style={{marginTop: 20}}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../assets/images/newsong.png')}
                style={{width: 150, height: 150}}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <View>
                <Text style={{color: '#fff', fontSize: 24, fontWeight: '500'}}>
                  Mới phát hành
                </Text>
                <Text style={{color: '#fff', fontSize: 16}}>
                  Bài hát mới phát hành
                </Text>
              </View>
              <View>
                <Pressable
                  onPress={async () => {
                    await setupPlayer(dataMusic);
                    await TrackPlayer.skip(0);
                    const trackObject = await TrackPlayer.getTrack(0);
                    setCurrentTrack(trackObject);
                    setCurrentIndex(0);
                    await TrackPlayer.play();
                  }}
                  style={styles.playMusic}>
                  <Ionicons name="play" size={32} color="#0063ec" />
                </Pressable>
              </View>
            </View>
          </View>
        </LinearGradient>

        <FlatList
          data={dataMusic}
          renderItem={({item, index}: any) => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={async () => {
                  await setupPlayer(dataMusic);
                  await TrackPlayer.pause();
                  await TrackPlayer.skip(index);
                  await TrackPlayer.play();
                  const trackObject = await TrackPlayer.getTrack(index);
                  setCurrentTrack(trackObject);
                  setCurrentIndex(index);
                }}
                style={[
                  styles.musicItem,
                  {
                    backgroundColor: item.id % 2 === 1 ? '#f7f7f7' : '#fff',
                  },
                ]}>
                {currentTrack &&
                currentTrack.id === item.id &&
                State.Playing === playbackState ? (
                  <Ionicons
                    name="radio-outline"
                    size={20}
                    color="#0063ec"
                    style={{marginHorizontal: 10}}
                  />
                ) : (
                  <Text style={styles.index}>{index + 1}</Text>
                )}

                <View style={styles.musicInfo}>
                  <Avatar
                    source={{uri: item.artwork}}
                    size={48}
                    avatarStyle={{borderRadius: 5}}
                  />
                  <View style={{flex: 1}}>
                    <Text
                      style={{color: '#000', fontSize: 16, fontWeight: '500'}}
                      numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text>{item.artist}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    columnGap: 10,
                  }}>
                  <Ionicons name="heart-outline" size={28} color={'#000'} />
                  <Ionicons name="ellipsis-vertical" size={28} color={'#000'} />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {currentTrack && <BottomModalComponent />}
      {/* <PlayMusicComponent /> */}
    </>
  );
};
const styles = StyleSheet.create({
  musicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  index: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 10,
  },
  musicInfo: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
    flex: 1,
  },
  playMusic: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
  },
});
export default NewReleaseScreen;
