import { StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Pressable, TouchableOpacity } from 'react-native';
import { Text, View } from '../../components/Themed';
import React from 'react';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';

export default function TabOneScreen() {

  const [name, setName] = useState('');
  const [connected, setConnected] = useState(false);

  const router = useRouter();
  
  useEffect(() => {
    const getInfos = async() => {
      await SecureStore.getItemAsync('login_key').then(function(key){
        if(key!= null) {
          setConnected(true); 
          const decodedKey: any = jwtDecode(key as any)
          setName(decodedKey.username); 
        }
      })
      .catch(function() {
      return null;
      });
    }
    getInfos()
  }, [])

  const disconnect = async() => {
    setConnected(false);
    await SecureStore.deleteItemAsync('login_key').then(function(){
      setName('');
      router.replace("/accueil");
    });
  }
  

  return (
    <View style={styles.container}>
      <View style={{height: 100, width: 100, borderRadius: 180, backgroundColor: 'grey'}}/>
      <Text style={{marginTop: 20}}> {name} </Text>
      { connected && <Link href="/Animaux" asChild style={styles.link}>
        <Pressable>
          {({ pressed }) => (
          <Text style={{ opacity: pressed ? 0.5 : 1}}>Mes animaux</Text>
          )}
        </Pressable>
      </Link> }
      { connected && <Link href="/historique" asChild style={styles.link}>
        <Pressable>
          {({ pressed }) => (
          <Text style={{ opacity: pressed ? 0.5 : 1}}>Réservations</Text>
          )}
        </Pressable>
      </Link>}
      { !connected && <Link href="/connexion" asChild style={styles.link}>
        <Pressable>
          {({ pressed }) => (
          <Text style={{ opacity: pressed ? 0.5 : 1}}>Connexion</Text>
          )}
        </Pressable>
      </Link>}
      { !connected &&<Link href="/inscription" asChild style={styles.link}>
        <Pressable>
          {({ pressed }) => (
          <Text style={{ opacity: pressed ? 0.5 : 1}}>Inscription</Text>
          )}
        </Pressable>
      </Link>}
      { connected && <TouchableOpacity onPress={() => disconnect()}style={styles.link}>
          <Text>Se déconnecter</Text>
      </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    link: {
      marginVertical: 30,
      width: '60%',
      backgroundColor: 'gainsboro',
      height:'5%',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:180
    },
  });
  