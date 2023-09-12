import {useContext} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {AuthContext} from '../../../context';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PlayListComponent = () => {
  const {currentTrack} = useContext(AuthContext);
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        paddingHorizontal: 18,
        paddingVertical: 24,
      }}>
      <View style={styles.musicInfo}>
        <View style={styles.title}>
          <View>
            <Image
              style={{width: 60, height: 60, borderRadius: 5}}
              source={{
                uri: currentTrack
                  ? currentTrack.artwork
                  : 'https://duhxmp3.000webhostapp.com/images/music/play-default.webp',
              }}
            />
          </View>
          <View>
            <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>
              {currentTrack && currentTrack.title}
            </Text>
            <Text style={{color: '#e7e7e7'}}>
              {currentTrack && currentTrack.artist}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                columnGap: 20,
                alignItems: 'center',
                marginTop: 4,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 4,
                }}>
                <Ionicons name="heart-outline" size={16} color={'#e7e7e7'} />
                <Text style={{color: '#e7e7e7'}}>25K</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 4,
                }}>
                <Ionicons name="headset-outline" size={16} color={'#e7e7e7'} />
                <Text style={{color: '#e7e7e7', fontSize: 14}}>488K</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{marginTop: 10, rowGap: 5}}>
          <View
            style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
            <Text style={{width: 60, color: '#e7e7e7'}}>Nhạc sĩ</Text>
            <Text style={{color: '#fff', fontWeight: '500'}}>
              {currentTrack.artist}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
            <Text style={{width: 60, color: '#e7e7e7'}}>Thể loại</Text>
            <Text style={{color: '#fff', fontWeight: '500'}}>
              {currentTrack.genre}
            </Text>
          </View>
          <View
            style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
            <Text style={{width: 60, color: '#e7e7e7'}}>Cung cấp</Text>
            <Text style={{color: '#fff', fontWeight: '500'}}>
              NCT Corporation
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  musicInfo: {
    width: '100%',
    borderRadius: 8,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  title: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomColor: '#cfcfcf',
    borderBottomWidth: 0.2,
  },
});
export default PlayListComponent;
