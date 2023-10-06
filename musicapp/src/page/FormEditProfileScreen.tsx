import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
enum ATTRIBUTE {
  FULLNAME,
  BIO,
}
const FormEditProfileScreen = ({navigation, route}: any) => {
  const {title, value, previousRoute, state} = route.params;
  const [inputValue, setInputValue] = useState(route.params.value);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={'#000'} />
          </Pressable>
          <Text style={{fontSize: 18, fontWeight: '500'}}>{title}</Text>
          <Pressable
            onPress={
              inputValue !== value && inputValue
                ? () =>
                    navigation.navigate(previousRoute, {
                      state: state,
                      value: inputValue,
                    })
                : null
            }>
            <Text
              style={{
                color:
                  inputValue !== value && inputValue ? '#0063ec' : '#c5c5c5',
              }}>
              Lưu
            </Text>
          </Pressable>
        </View>
        <View>
          {state === ATTRIBUTE.FULLNAME ? (
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={value => setInputValue(value)}
              placeholder="Nhập họ và tên"
            />
          ) : (
            <TextInput
              multiline={true}
              numberOfLines={4}
              value={inputValue}
              onChangeText={value => setInputValue(value)}
              placeholder="Mô tả bản thân"
              style={{
                backgroundColor: '#fff',
                minHeight: 100,
                textAlignVertical: 'top',
              }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1.0,
  },

  input: {
    marginTop: 5,
    backgroundColor: '#fff',
  },
});
export default FormEditProfileScreen;
