import {BottomModal, ModalContent} from 'react-native-modals';

import {View, Pressable, Text, StyleSheet, Image} from 'react-native';

import {useContext} from 'react';
import {AuthContext} from '../../../context';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import HeartComponent from '../../button/Heart';

const ModalPlayerComponent = () => {
  const {
    modalVisible,
    setModalVisible,
    setCurrentTrack,
    currentTrack,
    setCurrentIndex,
    currentIndex,
  } = useContext(AuthContext);
  const progress = useProgress();
  const playbackState = usePlaybackState();
  const format = (seconds: any) => {
    let mins = parseInt(`${seconds / 60}`, 10)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  // Skip to next Track
  const nextTrack = async () => {
    await TrackPlayer.pause();

    if (currentIndex < (await TrackPlayer.getQueue()).length - 1) {
      await TrackPlayer.skipToNext();
      const trackObject = await TrackPlayer.getTrack(currentIndex + 1);
      setCurrentIndex(currentIndex + 1);
      setCurrentTrack(trackObject);
    } else {
      await TrackPlayer.skip(0);
      setCurrentIndex(0);
      const trackObject = await TrackPlayer.getTrack(0);
      setCurrentTrack(trackObject);
    }

    await TrackPlayer.play();
  };

  // Skip to Previous track
  const previousTrack = async () => {
    await TrackPlayer.pause();
    if (currentIndex > 0) {
      await TrackPlayer.skip(currentIndex - 1);
      const trackObject = await TrackPlayer.getTrack(currentIndex - 1);
      setCurrentIndex(currentIndex - 1);
      setCurrentTrack(trackObject);
    } else {
      await TrackPlayer.skip(0);
      setCurrentIndex(0);
      const trackObject = await TrackPlayer.getTrack(0);
      setCurrentTrack(trackObject);
    }
    await TrackPlayer.play();
  };
  return (
    <BottomModal
      visible={modalVisible}
      swipeDirection={['up', 'down']}
      swipeThreshold={200}>
      <ModalContent
        style={{
          width: '100%',
          height: '101%',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          paddingVertical: 0,
          paddingHorizontal: 0,
        }}>
        <View
          style={{flex: 1, backgroundColor: '#6f86d6', paddingHorizontal: 18}}>
          <View style={styles.header}>
            <Ionicons
              name="chevron-down"
              size={24}
              color={'white'}
              onPress={() => setModalVisible(false)}
            />
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
              {currentTrack && currentTrack.title}
            </Text>
            <Ionicons name="ellipsis-horizontal" size={24} color={'white'} />
          </View>
          {/* Image */}
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Image
              style={styles.musicPlayImg}
              source={{
                uri: currentTrack
                  ? currentTrack.artwork
                  : 'https://duhxmp3.000webhostapp.com/images/music/play-default.webp',
              }}
            />
          </View>

          {/* Music info */}
          <View style={styles.header}>
            <Pressable style={{flex: 1}}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                {currentTrack && currentTrack.title}
              </Text>
              <Text style={{color: '#d3d3d3', marginTop: 5}}>
                {currentTrack && currentTrack.artist}
              </Text>
            </Pressable>
            {currentTrack && <HeartComponent song={currentTrack} />}
          </View>

          {/* Slider */}
          <View style={{marginTop: 20, width: '100%'}}>
            <Slider
              style={{width: '100%', height: 3}}
              minimumValue={0}
              maximumValue={progress.duration}
              step={1}
              value={progress.position}
              onSlidingStart={async () => {
                if (playbackState !== State.Playing) return;
                try {
                  await TrackPlayer.pause();
                } catch (error) {
                  console.log('error inside onSlidingStart callback', error);
                }
              }}
              onSlidingComplete={async value => {
                await TrackPlayer.seekTo(value);
                await TrackPlayer.play();
              }}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#fff"
              thumbTintColor="#fff"
            />
            <View
              style={{
                marginTop: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: 15}}>
                {format(progress.position)}
              </Text>
              <Text style={{color: 'white', fontSize: 15}}>
                {format(progress.duration)}
              </Text>
            </View>
          </View>

          {/* Control */}
          <View style={styles.header}>
            <Ionicons name="shuffle" size={30} color="#d3d3d3" />
            <Ionicons
              onPress={previousTrack}
              name="play-skip-back"
              size={30}
              color="#fff"
            />
            <Ionicons
              onPress={async () => {
                if (State.Playing === playbackState) {
                  await TrackPlayer.pause();
                } else if (State.Paused) {
                  await TrackPlayer.play();
                }
              }}
              name={
                State.Playing === playbackState ? 'pause-circle' : 'play-circle'
              }
              size={60}
              color="#fff"
            />
            <Ionicons
              onPress={nextTrack}
              name="play-skip-forward"
              size={30}
              color="#fff"
            />
            <Ionicons name="repeat" size={30} color="#d3d3d3" />
          </View>
        </View>
      </ModalContent>
    </BottomModal>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 24,
  },
  musicPlayImg: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderColor: '#fff',
    borderWidth: 2,
  },
});
export default ModalPlayerComponent;
