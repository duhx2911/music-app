import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../page/LoginScreen';
import SignupScreen from '../../page/SignupScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Pressable} from 'react-native';
import HomeTab from '../tab/HomeTab';

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
    </Stack.Navigator>
  );
};
export default HomeStack;