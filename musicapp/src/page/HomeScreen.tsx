import {ScrollView, View} from 'react-native';
import HeaderComponent from '../component/page/home/Header';
import {StyleSheet} from 'react-native';
import ContentComponent from '../component/page/home/Content';

const HomeScreen = ({navigation}: any) => {
  const handleDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <ScrollView style={{backgroundColor: '#ffffff'}}>
      <View style={styles.container}>
        <HeaderComponent handleDrawer={handleDrawer} />
        <ContentComponent />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default HomeScreen;
