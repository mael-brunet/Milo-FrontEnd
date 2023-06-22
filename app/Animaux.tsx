import { StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { Text, View } from '../components/Themed';
import { Link } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { copyStackTrace } from '@testing-library/react-native/build/helpers/errors';


function Animaux() {

  const [animaux, setAnimaux] = useState({});

  useEffect(() => {
    const getInfos = async() => {
      await SecureStore.getItemAsync('login_key').then(async function(key){
        if(key!= null) {
          const decodedKey: any = jwtDecode(key as any)
          await axios.get('http://10.0.2.2:3000/animaux/' + decodedKey.sub )
          .then(async function (response) {
            setAnimaux(response.data);
          })
        }
      })
    }
    getInfos()
    
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{alignItems: 'center'}}>
      <View style={{backgroundColor: '#F7931E', width:'40%', height:5, marginTop: '5%', borderRadius: 10, marginBottom: 5}}/>
      <Text style={styles.title}> VOS ANIMAUX </Text>
      {Object.entries(animaux).map(([id, animal]: [string, any]) => (
      
        <Link key={id} href={`/animauxprofil?id=${animal._id}`} asChild>
        <Pressable>
          {({ pressed }) => (
            <View style={styles.animal}>
              <View style={styles.icon}>
                <Image style={styles.picture} source={require('../assets/images/profil.png')}/>
              </View>
              <View style={styles.content}>
                <Text style={{ fontSize: 20, marginBottom: 5, fontWeight: 'bold', color: '#4922B2' }}> {animal.nom} </Text>
                <Text style={styles.text}> {animal.race} </Text>
              </View>
              <Image style={{ flex: 1, width: 30, height: 30, resizeMode: 'contain' }}
                source={require('../assets/images/arrow1.png')} />
            </View>
          )}
        </Pressable>
        </Link>
      ))}
      <Link href="/AnimauxForm" asChild style={{width:'90%'}}>
        <Pressable>
          {({ pressed }) => (
          <View style={[styles.add, {justifyContent: 'center'}]}>
            <Image style={{ flex: 1, width: 80, height: 80, resizeMode: 'contain'}} 
            source={require('../assets/images/patoune.png')}/>
            <Text style={{fontWeight: 'bold', fontSize: 20, color: '#F7931E', marginBottom: 10}}> Ajouter un animal </Text>
          </View>
          )}
      </Pressable>
    </Link>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4922B2'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F7931E',
  },
  icon: {
    height: 80, 
    width: 80, 
    borderRadius: 180, 
    backgroundColor: '#F7931E', 
    alignItems:'center',
    justifyContent:'center',
    marginLeft:'5%'
  },
  picture: {
    height: 72, 
    width: 72, 
    borderRadius: 180, 
    backgroundColor: 'grey',
  },
  content: {
    width:'50%',
    marginLeft: 10
  },
  text: {
    color: '#4922B2',
    fontWeight: 'bold'
  },
  animal: {
    flexDirection: 'row',    
    width: '90%',
    height: 120,
    alignItems:'center',
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
  add: {
    height: 150,
    alignItems:'center',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    marginTop: '5%',
    marginBottom: '5%',
  }
});

export default Animaux;