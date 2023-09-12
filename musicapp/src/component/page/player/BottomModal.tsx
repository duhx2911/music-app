import {useContext} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../../context';

const BottomModalComponent = () => {
  const progress = useProgress();
  const playbackState = usePlaybackState();
  const {currentTrack, setModalVisible} = useContext(AuthContext);
  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <View
        style={{
          height: 2.5,
          width: '100%',
          backgroundColor: '#aaaaaa',
        }}>
        <View
          style={{
            height: 2.5,
            width: `${(progress.position / progress.duration) * 100}%`,
            backgroundColor: '#0063EC',
          }}></View>
      </View>
      <View style={styles.modalBottom}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: 10,
          }}>
          <Image
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
            source={{uri: currentTrack.artwork}}
          />
          <View>
            <Text
              style={{
                color: '#000',
                fontSize: 14,
                width: 220,
                fontWeight: '500',
              }}
              numberOfLines={1}>
              {currentTrack.title}
            </Text>
            <Text
              style={{
                color: '#555555',
                fontSize: 14,
                width: 220,
              }}
              numberOfLines={1}>
              {currentTrack.artist}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            columnGap: 10,
          }}>
          <Pressable
            onPress={async () => {
              if (State.Playing === playbackState) {
                await TrackPlayer.pause();
              } else if (State.Paused) {
                await TrackPlayer.play();
              }
            }}>
            {State.Playing === playbackState ? (
              <Ionicons name="pause" size={24} color={'#000'} />
            ) : (
              <Ionicons name="play" size={24} color={'#000'} />
            )}
          </Pressable>
          <Pressable>
            <Ionicons name="play-skip-forward" size={24} color={'#000'} />
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  modalBottom: {
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 'auto',
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
export default BottomModalComponent;
