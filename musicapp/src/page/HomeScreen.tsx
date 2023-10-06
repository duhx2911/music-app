import {ScrollView, View, SafeAreaView} from 'react-native';
import HeaderComponent from '../component/page/home/Header';
import {StyleSheet} from 'react-native';
import ContentComponent from '../component/page/home/Content';
import BottomModalComponent from '../component/page/player/BottomModal';
import {useContext} from 'react';
import {AuthContext} from '../context';

const HomeScreen = ({navigation}: any) => {
  const handleDrawer = () => {
    navigation.openDrawer();
  };
  const {currentTrack} = useContext(AuthContext);
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{backgroundColor: '#ffffff'}}>
        <View style={styles.container}>
          <HeaderComponent handleDrawer={handleDrawer} />
          <ContentComponent />
        </View>
      </ScrollView>
      {currentTrack && <BottomModalComponent />}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default HomeScreen;
