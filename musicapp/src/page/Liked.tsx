import {ScrollView, Text, View, SafeAreaView} from 'react-native';
import LikedItemComponent from '../component/page/liked/LikedItem';
import {useContext} from 'react';
import {AuthContext} from '../context';
import BottomModalComponent from '../component/page/player/BottomModal';

const LikedScreen = () => {
  const {dataLiked, currentTrack, isLogin} = useContext(AuthContext);
  // console.log(dataLiked);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView>
        {isLogin && dataLiked && dataLiked.length ? (
          <LikedItemComponent />
        ) : (
          <View>
            <Text>Bạn chưa thích bài hát nào</Text>
          </View>
        )}
      </ScrollView>
      {currentTrack && <BottomModalComponent />}
    </SafeAreaView>
  );
};
export default LikedScreen;
