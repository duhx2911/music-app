import {useContext} from 'react';
import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import {AuthContext} from '../../../context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeartComponent from '../../button/Heart';
import {ILiked} from '../../../constants';

const LikedItemComponent = () => {
  const {dataLiked} = useContext(AuthContext);
  // console.log(dataLiked);

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        flexGrow: 1,
        paddingHorizontal: 18,
        paddingTop: 24,
      }}>
      <View style={{alignItems: 'center', marginBottom: 24}}>
        <Text style={{textAlign: 'center', fontSize: 24, fontWeight: '500'}}>
          Bài hát yêu thích
        </Text>
        <Text style={{textAlign: 'center'}}>{dataLiked.length} bài hát</Text>
        <Pressable
          style={{
            backgroundColor: '#0063ec',
            width: 110,
            paddingVertical: 5,
            borderRadius: 18,
            marginTop: 15,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              fontWeight: '500',
              textAlign: 'center',
            }}>
            Phát tất cả
          </Text>
        </Pressable>
      </View>
      {dataLiked.map((item: ILiked, index: number) => {
        return (
          <Pressable
            key={item.id}
            style={[
              styles.musicItem,
              {
                backgroundColor: index % 2 === 1 ? '#f7f7f7' : '#fff',
              },
            ]}>
            <View style={styles.musicInfo}>
              <Image
                source={{uri: item.artwork}}
                style={{width: 48, height: 48, borderRadius: 5}}
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
              <HeartComponent
                song={{
                  id: item.id_song,
                  title: item.title,
                  genre: item.genre,
                  artwork: item.artwork,
                  artist: item.artist,
                  url: item.url,
                }}
              />
              <Ionicons name="ellipsis-vertical" size={28} color={'#555555'} />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  musicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  musicInfo: {
    flexDirection: 'row',
    columnGap: 10,
    alignItems: 'center',
    flex: 1,
  },
});
export default LikedItemComponent;
