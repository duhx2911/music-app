import {View} from 'react-native';
import TopicOfDayComponent from './content/TopicOfDay';
import NewRelease from './content/NewRelease';
const ContentComponent = () => {
  return (
    <View>
      <TopicOfDayComponent />
      <NewRelease />
    </View>
  );
};

export default ContentComponent;
