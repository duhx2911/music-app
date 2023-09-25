import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import useFetch from '../../../../hooks/useFetch';

const RecommendTodayComponent = () => {
  const {data: dataMusic} = useFetch('/musictoday');
  return (
    <View style={{marginTop: 20}}>
      <Text style={styles.title}>Gợi ý hôm nay</Text>
      <FlatList
        style={{marginTop: 10}}
        data={dataMusic}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({
          item,
        }: {
          item: {
            id: number;
            genre: string;
            artist: string;
            artwork: string;
            title: string;
            url: string;
          };
        }) => {
          return (
            <Pressable key={item.id} style={styles.cardItem}>
              <Image style={styles.cardImg} source={{uri: item.artwork}} />
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.cardTitle}>
                {item.title}
              </Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={styles.cardSinger}>
                {item.artist}
              </Text>
            </Pressable>
          );
        }}
      />
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
    alignItems: 'flex-start',
    width: 126,
    marginRight: 20,
  },
  cardImg: {
    width: 126,
    height: 126,
  },
  cardSinger: {
    fontSize: 14,
    color: '#4b4b4b',
  },
  cardTitle: {
    fontSize: 16,
    marginTop: 5,
    color: '#000',
    fontWeight: '500',
  },
});
export default RecommendTodayComponent;