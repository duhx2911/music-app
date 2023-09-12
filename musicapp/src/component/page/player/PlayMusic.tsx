import Slider from '@react-native-community/slider';
import {useContext} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../../context';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';

const PlayMusicComponent = () => {
  //   useEffect(() => {
  //     props.setTitle('Nhạc');
  //   }, []);
  const {currentTrack, setCurrentTrack, currentIndex, setCurrentIndex} =
    useContext(AuthContext);
  const progress = useProgress();
  const playbackState = usePlaybackState();

  const format = (seconds: any) => {
    let mins = parseInt(`${seconds / 60}`, 10)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
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
    <View
      style={{
        flex: 1,
        width: '100%',
        paddingHorizontal: 18,
        paddingBottom: 24,
      }}>
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

      {/* Music Info */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <View>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
            {currentTrack ? currentTrack.title : ''}
          </Text>
          <Text style={{color: '#d3d3d3', marginTop: 5}}>
            {currentTrack ? currentTrack.artist : ''}
          </Text>
        </View>
        <Ionicons name="heart-outline" size={28} color={'white'} />
      </View>

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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 17,
        }}>
        <Pressable>
          <Ionicons name="shuffle" size={30} color="#d3d3d3" />
        </Pressable>
        <Pressable onPress={previousTrack}>
          <Ionicons name="play-skip-back" size={30} color="white" />
        </Pressable>
        <Pressable
          onPress={async () => {
            if (State.Playing === playbackState) {
              await TrackPlayer.pause();
            } else if (State.Paused) {
              await TrackPlayer.play();
            }
          }}>
          {State.Playing === playbackState ? (
            <Ionicons name="pause-circle" size={60} color={'#fff'} />
          ) : (
            <Ionicons name="play-circle" size={60} color={'#fff'} />
          )}
        </Pressable>
        <Pressable onPress={nextTrack}>
          <Ionicons name="play-skip-forward" size={30} color="white" />
        </Pressable>
        <Pressable>
          <Ionicons name="repeat" size={30} color="#d3d3d3" />
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  musicPlayImg: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderColor: '#fff',
    borderWidth: 2,
  },
});
export default PlayMusicComponent;
