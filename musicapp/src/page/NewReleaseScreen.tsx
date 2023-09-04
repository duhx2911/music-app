import {useNavigation} from '@react-navigation/native';
import {
  Image,
  ScrollView,
  Text,
  View,
  Pressable,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'react-native-linear-gradient';
import {Avatar} from '@rneui/themed';
import useFetch from '../hooks/useFetch';
import {useContext, useState} from 'react';
import {AuthContext} from '../context';
import {BottomModal, ModalContent} from 'react-native-modals';

const NewReleaseScreen = () => {
  const {data: dataMusic} = useFetch('/music');
  const {currentTrack, setCurrentTrack} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const playMusic = async () => {
    if (dataMusic.length > 0) {
      setCurrentTrack(dataMusic[0]);
    }
    // await play(dataMusic[0]);
  };
  // const play = async () => {};
  return (
    <>
      <ScrollView style={{backgroundColor: '#fff'}}>
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
                <Pressable onPress={playMusic} style={styles.playMusic}>
                  <Ionicons name="play" size={32} color="#0063ec" />
                </Pressable>
              </View>
            </View>
          </View>
        </LinearGradient>
        <View style={{padding: 10}}>
          {dataMusic.map(
            (
              item: {
                id: number;
                cate_id: number;
                music_name: string;
                music_img: string;
                singer: string;
                audio: string;
              },
              index,
            ) => {
              return (
                <Pressable
                  key={item.id}
                  style={[
                    styles.musicItem,
                    {backgroundColor: item.id % 2 === 1 ? '#f7f7f7' : '#fff'},
                  ]}>
                  <Text style={styles.index}>{index + 1}</Text>
                  <View style={styles.musicInfo}>
                    <Avatar
                      source={{uri: item.music_img}}
                      size={48}
                      avatarStyle={{borderRadius: 5}}
                    />
                    <View style={{flex: 1}}>
                      <Text
                        style={{color: '#000', fontSize: 16, fontWeight: '500'}}
                        numberOfLines={1}>
                        {item.music_name}
                      </Text>
                      <Text>{item.singer}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      columnGap: 10,
                    }}>
                    <Ionicons name="heart-outline" size={28} color={'#000'} />
                    <Ionicons
                      name="ellipsis-vertical"
                      size={28}
                      color={'#000'}
                    />
                  </View>
                </Pressable>
              );
            },
          )}
        </View>
      </ScrollView>
      {currentTrack && (
        <Pressable
          style={styles.modalBottom}
          onPress={() => setModalVisible(!modalVisible)}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
            <Avatar size={40} source={{uri: currentTrack.music_img}} />
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                width: 220,
                fontWeight: 'bold',
              }}
              numberOfLines={1}>
              {currentTrack.music_name} - {currentTrack.singer}
            </Text>
          </View>
          <Pressable>
            <Ionicons name="pause" size={24} color={'#fff'} />
          </Pressable>
        </Pressable>
      )}
      <BottomModal
        visible={modalVisible}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}>
        <ModalContent
          style={{
            width: '100%',
            height: '101%',
            backgroundColor: '#5072A6',
          }}>
          <View style={{height: '100%'}}>
            <Pressable>
              <Ionicons
                name="chevron-down"
                size={24}
                color={'white'}
                onPress={() => setModalVisible(false)}
              />
              <Text>{currentTrack && currentTrack.music_name}</Text>
              <Ionicons name="ellipsis-horizontal" size={24} color={'white'} />
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};
const styles = StyleSheet.create({
  modalBottom: {
    backgroundColor: '#0063ec',
    width: '90%',
    padding: 10,
    marginHorizontal: 'auto',
    marginBottom: 15,
    position: 'absolute',
    borderRadius: 8,
    left: 20,
    bottom: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
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
