import {View, Image, StyleSheet} from 'react-native';
import { useEffect } from 'react';

import { useRouter } from 'expo-router';

export default function ModalScreen() {

  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/accueil");
    }, 3000);
  }, []);
  
  return (
    <View style={styles.container}>
        <Image source={require('../assets/images/logostart.png')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4922B2',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
