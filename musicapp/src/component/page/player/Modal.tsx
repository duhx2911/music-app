import {BottomModal, ModalContent} from 'react-native-modals';

import {
  View,
  Pressable,
  FlatList,
  useWindowDimensions,
  Text,
} from 'react-native';

import {useContext} from 'react';
import {AuthContext} from '../../../context';
import PlayMusicComponent from './PlayMusic';
import PlayListComponent from './PlayList';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LinearGradient} from 'react-native-linear-gradient';

const OnBoardingItem = (props: any) => {
  const {width} = useWindowDimensions();

  // console.log(1);

  return (
    <Pressable
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width,
      }}>
      {props.data.component}
    </Pressable>
  );
};

const ModalPlayerComponent = () => {
  const {modalVisible, setModalVisible, currentTrack} = useContext(AuthContext);
  // Skip to next Track

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
        <LinearGradient colors={['#48c6ef', '#6f86d6']} style={{flex: 1}}>
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 24,
              paddingHorizontal: 18,
            }}>
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
          </Pressable>
          <View
            style={{
              flex: 1,
            }}>
            <FlatList
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              bounces={false}
              renderItem={item => {
                return (
                  <OnBoardingItem
                    key={item.item.id}
                    data={{component: item.item.component}}
                  />
                );
              }}
              data={[
                {
                  id: 1,
                  label: 'play music',
                  component: <PlayMusicComponent />,
                },
                {
                  id: 2,
                  label: 'Thông tin',
                  component: <PlayListComponent />,
                },
              ]}
            />
          </View>
        </LinearGradient>
      </ModalContent>
    </BottomModal>
  );
};

export default ModalPlayerComponent;
