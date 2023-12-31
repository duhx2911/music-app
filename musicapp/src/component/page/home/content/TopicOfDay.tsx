import {useNavigation} from '@react-navigation/native';
import {Text, View, Pressable, Image, StyleSheet} from 'react-native';
const TopicOfDayComponent = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.topicItem}
        onPress={() =>
          navigation.navigate('NewRelease', {
            genreID: 1,
            title: 'Hot trong ngày',
            subtitle: 'Những bài hát được nghe nhiều nhất trong ngày hôm nay',
          })
        }>
        <Image
          source={require('../../../../assets/images/newsong.png')}
          style={styles.cardImage}
        />
        <Text numberOfLines={1} style={styles.cardTitle}>
          Hot trong ngày
        </Text>
      </Pressable>
      <Pressable
        style={styles.topicItem}
        onPress={() =>
          navigation.navigate('NewRelease', {
            genreID: 7,
            title: 'Top 100 V-Pop',
            subtitle: 'Top 100 ca khúc V-Pop',
          })
        }>
        <Image
          source={require('../../../../assets/images/top100VPop.png')}
          style={styles.cardImage}
        />
        <Text numberOfLines={1} style={styles.cardTitle}>
          Top 100 V-Pop
        </Text>
      </Pressable>
      <Pressable
        style={styles.topicItem}
        onPress={() =>
          navigation.navigate('NewRelease', {
            genreID: 6,
            title: 'Top 100 US-UK',
            subtitle: 'Top 100 US-UK',
          })
        }>
        <Image
          source={require('../../../../assets/images/top100EDM.png')}
          style={styles.cardImage}
        />
        <Text numberOfLines={1} style={styles.cardTitle}>
          Top 100 US-UK
        </Text>
      </Pressable>
      <Pressable
        style={styles.topicItem}
        onPress={() => navigation.navigate('NewRelease', {genreID: 2})}>
        <Image
          source={require('../../../../assets/images/rapvietmua3.jpg')}
          style={styles.cardImage}
        />
        <Text numberOfLines={1} style={styles.cardTitle}>
          Hip hop
        </Text>
      </Pressable>
      <Pressable
        style={styles.topicItem}
        onPress={() => navigation.navigate('NewRelease', {genreID: 3})}>
        <Image
          source={require('../../../../assets/images/poprising.jpg')}
          style={styles.cardImage}
        />
        <Text numberOfLines={1} style={styles.cardTitle}>
          Pop Rising Vietnam
        </Text>
      </Pressable>
      <Pressable style={styles.topicItem}>
        <Image
          source={require('../../../../assets/images/trending.jpg')}
          style={styles.cardImage}
        />
        <Text numberOfLines={1} style={styles.cardTitle}>
          Thịnh hành
        </Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 20,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 5,
    backgroundColor: '#4b4b4b',
    borderRadius: 5,
    width: '49%',
  },
  cardTitle: {
    fontSize: 14,
    color: '#ffffff',
    paddingLeft: 5,
    flex: 1,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
export default TopicOfDayComponent;
