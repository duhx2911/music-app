import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../page/HomeScreen';
import SearchScreen from '../../page/SearchScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';
import UserScreen from '../../page/UserScreen';

import ModalPlayerComponent from './../../component/page/player/Modal';

const Tab = createBottomTabNavigator();
const HomeTab = () => {
  const primaryColor: string = '#0063EC';
  return (
    <>
      <ModalPlayerComponent />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconName!: string;
            let color!: string;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
              color = focused ? primaryColor : '#4B4B4B';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search-sharp' : 'search-outline';
              color = focused ? primaryColor : '#4B4B4B';
            } else if (route.name === 'UserScreen') {
              iconName = focused ? 'person' : 'person-outline';
              color = focused ? primaryColor : '#4B4B4B';
            }

            return <Ionicons name={iconName} size={26} color={color} />;
          },
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="UserScreen" component={UserScreen} />
      </Tab.Navigator>
    </>
  );
};
const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 1,
    shadowRadius: 16.0,
    elevation: 24,
    backgroundColor: '#fff',
  },
});
export default HomeTab;
