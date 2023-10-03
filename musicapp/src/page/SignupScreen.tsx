import {useContext, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from 'react-native';
import {AuthContext} from '../context';
import {ToastAndroid} from 'react-native';
const showToast = (mess: string) => {
  ToastAndroid.show(mess, ToastAndroid.SHORT);
};

const SignupScreen = ({navigation}: any) => {
  const {signup} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const register = async () => {
    if (fullname === '') {
      showToast('Hãy điền tên của bạn!');
    } else if (email === '') {
      showToast('Hãy điền email!');
    } else if (username === '') {
      showToast('Hãy điền tên người dùng!');
    } else if (password === '') {
      showToast('Hãy điền mật khẩu!');
    } else {
      setLoading(true);
      const postData = await signup(fullname, email, username, password);
      if (postData.status === 200) {
        if (postData.data.status === 'success') {
          showToast('Đăng ký thành công');
          setEmail('');
          setFullname('');
          setUsername('');
          setPassword('');
          setLoading(false);
          navigation.navigate('Login');
        } else {
          setLoading(false);
          setUsername('');
          showToast('Tên tài khoản đã tồn tại');
        }
      }
    }
  };
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Image
              source={require('../assets/images/logoapp.png')}
              style={{width: 150, height: 150}}
            />
          </View>
          <View style={{width: '100%', rowGap: 15}}>
            <TextInput
              style={styles.input}
              placeholder="Họ và tên, VD: Nguyễn Văn A"
              placeholderTextColor="#8391A1"
              onChangeText={value => setFullname(value)}
              value={fullname}
            />
            <TextInput
              style={styles.input}
              placeholder="Email, VD: nguyenvana@gmail.com"
              placeholderTextColor="#8391A1"
              onChangeText={value => setEmail(value)}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="Tên tài khoản, VD: duhx2911"
              placeholderTextColor="#8391A1"
              onChangeText={value => setUsername(value)}
              value={username}
            />
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu, VD: duc123"
              placeholderTextColor="#8391A1"
              autoCapitalize="none"
              secureTextEntry={true}
              blurOnSubmit={false}
              returnKeyType="next"
              underlineColorAndroid="#f000"
              enablesReturnKeyAutomatically
              onChangeText={value => setPassword(value)}
              value={password}
            />
          </View>

          <Pressable style={styles.loginBtn} onPress={register}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={{color: '#ffffff', fontSize: 20, fontWeight: '500'}}>
                Đăng ký
              </Text>
            )}
          </Pressable>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 5,
              marginTop: 30,
            }}>
            <View
              style={{height: 1, backgroundColor: '#E8ECF4', width: 70}}></View>
            <Text>Hoặc</Text>
            <View
              style={{height: 1, backgroundColor: '#E8ECF4', width: 70}}></View>
          </View>
          <View style={styles.loginWith}>
            <Pressable style={styles.loginWithItem}>
              <Image source={require('../assets/images/facebook_ic.png')} />
            </Pressable>
            <Pressable style={styles.loginWithItem}>
              <Image source={require('../assets/images/google_ic.png')} />
            </Pressable>
            <Pressable style={styles.loginWithItem}>
              <Image source={require('../assets/images/cib_apple.png')} />
            </Pressable>
          </View>
          <View style={{marginTop: 30}}>
            <Text style={{fontSize: 16}}>
              Bạn đã có tài khoản?{' '}
              <Text
                style={{color: '#0063EC'}}
                onPress={() => navigation.navigate('Login')}>
                Đăng nhập ngay
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    borderColor: '#E8ECF4',
    borderWidth: 1,
    backgroundColor: '#F7F8F9',
    borderRadius: 8,
    paddingLeft: 20,
    color: '#000',
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#0063EC',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  loginWith: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
  },
  loginWithItem: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderColor: '#E8ECF4',
    borderWidth: 1,
    borderRadius: 8,
  },
});
export default SignupScreen;
