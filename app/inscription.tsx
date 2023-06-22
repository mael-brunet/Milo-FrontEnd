import { StyleSheet, TextInput, Pressable} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '../components/Themed';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';

export default function TabTwoScreen() {

  const [firstname, onChangeFirstname] = useState('');
  const [lastname, onChangeLastname] = useState('');
  const [adresse, onChangeAdresse] = useState('');
  const [email, onChangeEmail] = useState('');
  const [phone, onChangePhone] = useState('');
  const [password, onChangePassword] = useState('');
  const [password2, onChangePassword2] = useState('');
  const [invisible, setInvisible] = useState(true);
  const [isChecked, setChecked] = useState(false);
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

  const submitForm = () => {
    console.log("test");
    axios.post('http://10.0.2.2:3000/user/', {
      firstname: firstname,
      lastname: lastname,
      adresse: adresse,
      email: email,
      phone: phone,  
      password: password,
    })
    .then((response) => {
      router.replace("/connexion");
    })
    .catch(function () {
      setError(true)
  })
  }

  const login = () => {
    router.replace("/connexion");
  }

  const politique = () => {
  }

  return (
    <LinearGradient colors={['#4922B2', '#F7931E']} style={styles.container}>
      <View style={{backgroundColor: 'transparent', flexDirection: 'row'}}>
        <View style={[styles.input2, {marginRight: '6%'}]}>
          <TextInput
            style={[styles.placeholder, {marginLeft: 20}]} 
            onChangeText={onChangeLastname}
            value={lastname}
            placeholderTextColor={'#4922B2'}
            placeholder="Nom" 
          />
        </View>
        <View style={styles.input2}>
          <TextInput
            style={[styles.placeholder, {marginLeft: 20}]} 
            onChangeText={onChangeFirstname}
            value={firstname}
            placeholderTextColor={'#4922B2'}
            placeholder="Prénom" 
          />
        </View>
      </View>
      <View style={styles.input}>
        <FontAwesome
          name="building"
          size={25}
          color={'#4922B2'}
          style={styles.image}
        />
        <TextInput
          style={styles.placeholder} 
          onChangeText={onChangeAdresse}
          value={adresse}
          placeholderTextColor={'#4922B2'}
          placeholder="Adresse" 
        />
      </View>
      <View style={styles.input}>
        <FontAwesome
          name="envelope"
          size={25}
          color={'#4922B2'}
          style={styles.image}
        />
        <TextInput
          style={styles.placeholder} 
          onChangeText={onChangeEmail}
          value={email}
          placeholderTextColor={'#4922B2'}
          placeholder="Email" 
        />
      </View>
      <View style={styles.input}>
        <FontAwesome
          name="mobile-phone"
          size={25}
          color={'#4922B2'}
          style={styles.image}
        />
        <TextInput
          style={styles.placeholder} 
          onChangeText={onChangePhone}
          value={phone}
          placeholderTextColor={'#4922B2'}
          placeholder="Téléphone" 
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
          secureTextEntry={invisible}
          onChangeText={onChangePassword}
          value={password}
          placeholderTextColor={'#4922B2'}
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

      <View style={styles.input}>
        <FontAwesome
          name="lock"
          size={25}
          color={'#4922B2'}
          style={styles.image}
        />
        <TextInput 
          style={styles.placeholder} 
          secureTextEntry={invisible}
          onChangeText={onChangePassword2}
          value={password2}
          placeholderTextColor={'#4922B2'}
          placeholder="Confirmez votre mot de passe"
        />
      </View>

      { errorShow && 
      <Text style={{color: 'yellow'}}> Information incorrecte</Text>
      }

      <View style={{backgroundColor: 'transparent', flexDirection: 'row', width: '70%', marginTop: 10}}>
        <Checkbox value={isChecked} style={styles.checkbox} onValueChange={setChecked}/>
        <Text style={{color: 'white'}}>
          J’ai lu et j’accepte les 
        <Text onPress={politique} style={{color:'#4922B2', textDecorationLine: "underline"}}> conditions générales d’utilisation </Text> 
          du service auquel je souscris.
          </Text>
      </View>

      <Pressable style={styles.button} onPress={submitForm}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}> S'inscrire </Text>
      </Pressable>

      <Pressable onPress={login}>
          {({ pressed }) => (
            <Text style={styles.link}> Déja un compte ? </Text>
          )}
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
    marginBottom: 10,
    marginTop: 10
  },
  input2: {
    width:'37%',
    height:60,
    backgroundColor:'white',
    borderRadius:15,
    flexDirection:'row',
    alignItems:'center',
    marginBottom: 10,
    marginTop: 10
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
    marginTop: 20,
    marginBottom: 15,
    borderRadius: 100,
    backgroundColor: '#4922B2',
  },
  checkbox: {
    backgroundColor: 'white',
    borderColor: 'white',
    marginRight: 5
  }
});
