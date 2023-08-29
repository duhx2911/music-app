import {Text, View, Pressable, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const ContentUser = () => {
  return (
    <View>
      <View style={styles.help}>
        <Pressable style={[styles.helpItem, styles.borderBottom]}>
          <View
            style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
            <Ionicons name="person" size={20} />
            <Text>Thiết lập tài khoản</Text>
          </View>
          <EvilIcons name="chevron-right" size={30} />
        </Pressable>
        <Pressable style={[styles.helpItem, styles.borderBottom]}>
          <View
            style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
            <Ionicons name="help-circle-outline" size={20} />
            <Text>Trung tâm trợ giúp</Text>
          </View>
          <EvilIcons name="chevron-right" size={30} />
        </Pressable>
        <Pressable style={styles.helpItem}>
          <View
            style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
            <Ionicons name="newspaper-outline" size={20} />
            <Text>Điều khoản sử dụng</Text>
          </View>
          <EvilIcons name="chevron-right" size={30} />
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  help: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  helpItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  borderBottom: {
    borderBottomColor: '#a8a1a1',
    borderBottomWidth: 0.2,
  },
});
export default ContentUser;
