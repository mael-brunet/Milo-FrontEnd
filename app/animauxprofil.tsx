import { StyleSheet, Image, Dimensions, Pressable } from 'react-native';
import { Text, View } from '../components/Themed';
import { Foundation } from '@expo/vector-icons'; 
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface RouteParams {
  id?: string;
}

export default function TabTwoScreen() {
  const route = useRoute();
  const { id } = route.params as RouteParams;
  const [animal, setAnimal] = useState<any>({});

  useEffect(() => {
    const getInfos = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/animaux/profil/' + id);
        setAnimal(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getInfos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Image style={styles.picture} source={require('../assets/images/profil.png')}/>
      </View>
      <Text style={{ marginBottom: 5, marginTop: 15}}>
      <Text style={{fontSize: 28, fontFamily: 'PurpleSmile', color: '#4922B2'  }}>{animal.nom}</Text> {animal.sexe == true ? (
            <Foundation name="male-symbol" size={28} color="#F7931E" />
          ) : (
            <Foundation name="female-symbol" size={28} color="#F7931E" />
          )}
      </Text>
      
      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <View style={[styles.info, styles.smallInfo]}>
          <Image style={styles.iconSmall} 
            source={require('../assets/images/profil1.png')}/>
            <Text style={styles.title}> AGE </Text>
            <Text style={styles.text}> {animal.age} ans </Text>
          </View>
          <View style={[styles.info, styles.smallInfo]}>
          <Image style={styles.iconSmall} 
            source={require('../assets/images/profil1.png')}/>
            <Text style={styles.title}> POIDS </Text>
            <Text style={styles.text}> {animal.poids}kg </Text>
          </View>
          <View style={[styles.info, {width:'30%', height:120}]}>
          <Image style={styles.iconSmall} 
            source={require('../assets/images/profil2.png')}/>
            <Text style={styles.title}> RACE </Text>
            <Text style={styles.text}> {animal.race} </Text>
          </View>
        </View>
        <View style={[styles.info, {width: Dimensions.get('window').width * 0.9, height: 180, backgroundColor: 'white', justifyContent: 'flex-start'}]}>
          <Text style= {{height:'20%', backgroundColor: '#4922B2', width: '100%', borderTopLeftRadius: 10,
          borderTopRightRadius: 10, textAlign: 'center', textAlignVertical: 'center', color: 'white', fontFamily: 'PurpleSmile'}}> 
          HABITUDES ALIMENTAIRE </Text>
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'transparent'}}>
            <Text style={{fontSize: 16, color:'#4922B2', fontFamily: 'BabyDoll' }}>{animal.habitude}</Text>
            </View>
        </View>
        <View style={[styles.info, {width: Dimensions.get('window').width * 0.9, height: 180, backgroundColor: 'white', justifyContent: 'flex-start'}]}>
          <Text style= {{height:'20%', backgroundColor: '#4922B2', width: '100%', borderTopLeftRadius: 10,
          borderTopRightRadius: 10, textAlign: 'center', textAlignVertical: 'center', color: 'white', fontFamily: 'PurpleSmile'}}> 
          COMPORTEMENT </Text>
            <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'transparent'}}>
            <Text style={{fontSize: 16, color:'#4922B2', fontFamily: 'BabyDoll' }}>{animal.comportement}</Text>
            </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    height: 100, 
    width: 100, 
    borderRadius: 180, 
    backgroundColor: '#F7931E', 
    alignItems:'center',
    justifyContent:'center',
    marginTop: '5%'
  },
  picture: {
    height: 90, 
    width: 90, 
    borderRadius: 180, 
    backgroundColor: 'grey',
  },
  iconSmall: {
    width: 45, height: 45, resizeMode: 'contain'
  },
  info: {  
    alignItems:'center',
    backgroundColor: '#4922B2',
    justifyContent:'center',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    marginTop: '3%',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'PurpleSmile',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'BabyDoll',
  },
  smallInfo: {
    width:'25%', 
    height:120, 
    marginRight: '5%'
  }
});
