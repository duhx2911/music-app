import {useContext} from 'react';
import {Text, ScrollView} from 'react-native';
import {AuthContext} from '../context';
import BottomModalComponent from '../component/page/player/BottomModal';

const SearchScreen = () => {
  const {currentTrack} = useContext(AuthContext);
  return (
    <>
      <ScrollView>
        <Text>Search Screen</Text>
      </ScrollView>
      {currentTrack && <BottomModalComponent />}
    </>
  );
};
export default SearchScreen;
