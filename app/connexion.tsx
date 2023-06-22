import { StyleSheet, TextInput, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '../components/Themed';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
import React from 'react';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';
import jwtDecode from 'jwt-decode';


export default function TabTwoScreen() {

  const [email, onChangeEmail] = useState('test@test.com');
  const [password, onChangePassword] = useState('password');
  const [invisible, setInvisible] = useState(true);
  const [errorShow, setError] = useState(false);

  let name: React.ComponentProps<typeof FontAwesome>['name'] = "eye-slash"

  const router = useRouter();

  const passwordVisible = () => {
    if(name == "eye-slash") {
      name = "eye";
    }
    else {
      name = "eye-slash"
    }
    setInvisible(!invisible);
  }

  const submitForm = async() => {
    if(email.length < 1 || password.length < 1) {
      return null;
    }
    else {
      await axios.get('http://10.0.2.2:3000/auth/utils/' + email + '/' + password)
        .then(async function (response) {
            await SecureStore.setItemAsync('login_key', response.data.access_token.toString());
            router.replace("/accueil");
        })
        .catch(function () {
          setError(true)
      })
    }
  }

  const forgotPassword = () => {
  }

  const register = () => {
    router.replace("/inscription");
  }


  return (
    <LinearGradient colors={['#4922B2', '#F7931E']} style={styles.container}>
      <View style={styles.input}>
        <FontAwesome
          name="user"
          size={25}
          color={'#4922B2'}
          style={styles.image}
        />
        <TextInput
          style={styles.placeholder} 
          placeholderTextColor={'#4922B2'}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="E-mail" 
        />
      </View>
      <View style={styles.input}>
        <FontAwesome
          name="lock"
          size={25}
          color={'#4922B2'}
          style={styles.image}
        />
        <TextInput
          style={styles.placeholder} 
          placeholderTextColor={'#4922B2'}
          secureTextEntry={invisible}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Mot de passe"
        />
        <Pressable onPress={passwordVisible}
          style={{marginLeft: 'auto', marginRight: 15}}>
          {({ pressed }) => (
            <FontAwesome
            name={name}
            size={25}
            color={'#4922B2'}
            style={{ opacity: pressed ? 0.5 : 1}}
          />
          )}
        </Pressable>
      </View>
      { errorShow && 
      <Text style={{color: 'yellow'}}> Nom d'utilisateur ou mot de passe incorrect </Text>
      }
      <View style={{flexDirection:'row', backgroundColor: 'transparent'}}>
        <Pressable onPress={forgotPassword} style={{marginRight: 50}}>
            {({ pressed }) => (
              <Text style={styles.link}> Mot de passe oublié ? </Text>
            )}
        </Pressable>

        <Pressable onPress={register}>
            {({ pressed }) => (
              <Text style={styles.link}> Pas de compte ?</Text>
            )}
        </Pressable>
      </View>

      <Pressable onPress={submitForm} style={styles.button}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}> Se connecter </Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width:'80%',
    height:60,
    backgroundColor:'white',
    borderRadius:15,
    flexDirection:'row',
    alignItems:'center',
    marginBottom: 20,
    marginTop: 20
  },
  image: {
    marginRight: 15, 
    marginLeft: 15
  },
  link: {
    color:'white',
    textDecorationLine: "underline",
    fontSize: 16
  },
  placeholder: {
    opacity: 0.5, 
    fontSize:18
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 40,
    borderRadius: 100,
    backgroundColor: '#4922B2',
  },
});
