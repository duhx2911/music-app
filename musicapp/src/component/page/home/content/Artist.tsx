import {StyleSheet, Text, FlatList, Pressable, Image} from 'react-native';
import {View} from 'react-native';
import useFetch from '../../../../hooks/useFetch';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Artist} from '../../../../constants';

const ArtistsComponent = () => {
  const {data: dataArtist} = useFetch('/artisttoday');

  return (
    <View style={{marginTop: 20}}>
      <Text style={styles.title}>Nghệ sĩ</Text>
      <FlatList
        style={{marginTop: 10}}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={dataArtist}
        renderItem={({item}: {item: Artist}) => {
          return (
            <Pressable key={item.id} style={styles.cardItem}>
              <Image source={{uri: item.avatar_artist}} style={styles.avatar} />
              <Text style={styles.cardTitle}>{item.name}</Text>
            </Pressable>
          );
        }}
      />
      <View style={{alignItems: 'center', marginTop: 10}}>
        <Pressable style={styles.seeall}>
          <Text style={{color: '#fff', fontWeight: '500'}}>Xem tất cả</Text>
          <Ionicons name="chevron-down" size={18} color={'#fff'} />
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000',
  },
  cardItem: {
    alignItems: 'center',
    width: 126,
    marginRight: 20,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5,
    color: '#000',
  },
  seeall: {
    backgroundColor: '#0063ec',
    width: 140,
    paddingVertical: 5,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 5,
  },
  avatar: {width: 126, height: 126, borderRadius: 63},
});
export default ArtistsComponent;
