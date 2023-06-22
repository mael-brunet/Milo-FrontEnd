import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>

      <Text> L'actualité </Text>

      <Text> Nos atouts </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    width:'100%',
    backgroundColor: 'grey',
    height: 300,
  },
});
