import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../page/LoginScreen';
import SignupScreen from '../../page/SignupScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Pressable} from 'react-native';
import HomeTab from '../tab/HomeTab';
import NewReleaseScreen from '../../page/NewReleaseScreen';
import EditProfileScreen from '../../page/EditProfile';
import FormEditProfileScreen from '../../page/FormEditProfileScreen';

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#000',
        headerTitleAlign: 'center',
        headerShadowVisible: true,
        headerTitleStyle: {
          fontWeight: 'normal',
          fontSize: 18,
        },
        headerRight: () => (
          <Pressable>
            <Ionicons name="help-circle-outline" size={28} />
          </Pressable>
        ),
      }}>
      <Stack.Screen
        name="HomeTab"
        component={HomeTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Đăng nhập',
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{title: 'Đăng ký'}}
      />
      <Stack.Screen
        name="NewRelease"
        component={NewReleaseScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{title: 'Thiết lập tài khoản'}}
      />
      <Stack.Screen
        name="EditProfileForm"
        component={FormEditProfileScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default HomeStack;
