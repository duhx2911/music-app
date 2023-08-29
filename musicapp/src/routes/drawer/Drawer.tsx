import {createDrawerNavigator} from '@react-navigation/drawer';

// import HomeTab from '../tab/HomeTab';
import ProfileScreen from '../../page/ProfileScreen';
import SettingScreen from '../../page/SettingScreen';
import CustomDrawer from '../../component/page/home/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeStack from '../stack/HomeStack';
const Drawer = createDrawerNavigator();
const DrawerRoute = () => {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
          headerShown: false,
          title: 'Trang chủ',
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
          title: 'Tài khoản',
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
          title: 'Cài đặt',
        }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerRoute;
