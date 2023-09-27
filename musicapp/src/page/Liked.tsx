import {ScrollView, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LikedItemComponent from '../component/page/liked/LikedItem';
import {useContext} from 'react';
import {AuthContext} from '../context';
import BottomModalComponent from '../component/page/player/BottomModal';

const LikedScreen = () => {
  const {dataLiked, currentTrack, isLogin} = useContext(AuthContext);
  // console.log(dataLiked);

  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        {isLogin && dataLiked && dataLiked.length ? (
          <LikedItemComponent />
        ) : (
          <View>
            <Ionicons name="musical-note-sharp" size={36} color={'#000'} />
            <Text>Bạn chưa thích bài hát nào</Text>
          </View>
        )}
      </ScrollView>
      {currentTrack && <BottomModalComponent />}
    </>
  );
};
export default LikedScreen;
