import {View} from 'react-native';
import TopicOfDayComponent from './content/TopicOfDay';
import NewRelease from './content/NewRelease';
import ArtistsComponent from './content/Artist';
import RecommendTodayComponent from './content/RecommendToday';
const ContentComponent = () => {
  return (
    <View>
      <TopicOfDayComponent />
      <NewRelease />
      <ArtistsComponent />
      <RecommendTodayComponent />
    </View>
  );
};

export default ContentComponent;
