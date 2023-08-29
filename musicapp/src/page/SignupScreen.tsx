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
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View>
          <Text style={{fontSize: 50, fontWeight: '500'}}>This is my Logo</Text>
        </View>
        <View style={{width: '100%', rowGap: 15}}>
          <TextInput
            style={styles.input}
            placeholder="Họ và tên, VD: Nguyễn Văn A"
            placeholderTextColor="#8391A1"
            onChangeText={value => setFullname(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email, VD: nguyenvana@gmail.com"
            placeholderTextColor="#8391A1"
            onChangeText={value => setEmail(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Tên tài khoản, VD: duhx2911"
            placeholderTextColor="#8391A1"
            onChangeText={value => setUsername(value)}
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
          />
        </View>

        <Pressable
          style={styles.loginBtn}
          onPress={() => {
            const checkSignup = signup(fullname, email, username, password);
            if (checkSignup._j !== false) {
              setLoading(true);
              showToast('Đăng ký thành công');
              setTimeout(() => {
                setEmail('');
                setFullname('');
                setUsername('');
                setPassword('');
                setLoading(false);
                navigation.navigate('Login');
              }, 1000);
            }
          }}>
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
        <View style={{marginTop: 50}}>
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
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 30,
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
