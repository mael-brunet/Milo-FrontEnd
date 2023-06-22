import { StyleSheet, TextInput, Pressable} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Text, View } from '../components/Themed';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import {Picker} from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';


export default function TabTwoScreen() {

  const [name, onChangeName] = useState('');
  const [age, onChangeAge] = useState('');
  const [poids, onChangePoids] = useState('');
  const [race, onChangeRace] = useState('');
  const [sexe, onChangeSexe] = useState(true);
  const [castre, onChangeCastre] = useState(false);
  const [habitude, onChangeHabitude] = useState('');
  const [comportement, onChangeComportement] = useState('');
  const [errorShow, setError] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    const getInfos = async() => {
      await SecureStore.getItemAsync('login_key').then(function(key){
        if(key!= null) {
          const decodedKey: any = jwtDecode(key as any)
          setId(decodedKey.sub)
        }
      })
      .catch(function() {
      return null;
      });
    }
    getInfos()
  }, [])

  const router = useRouter();

  const submitForm = () => {
    axios.post('http://10.0.2.2:3000/animaux/', {
      id_utilisateur: id,
      nom: name,
      age: age,
      race: race,
      sexe: sexe,
      poids: poids,
      is_castre: castre,  
      habitude: habitude,
      comportement: comportement,
    })
    .then((response) => {
      router.replace("/Animaux");
    })
    .catch(function () {
      setError(true)
  })
  }

  return (
    <LinearGradient colors={['#4922B2', '#F7931E']} style={styles.container}>
      <View style={{backgroundColor: 'transparent', flexDirection: 'row'}}>
        <View style={[styles.input2, {marginRight: '6%'}]}>
          <TextInput
            style={[styles.placeholder, {marginLeft: 20}]} 
            onChangeText={onChangeName}
            value={name}
            placeholderTextColor={'#4922B2'}
            placeholder="Nom" 
          />
        </View>
        <View style={styles.input2}>
          <TextInput
            style={[styles.placeholder, {marginLeft: 20}]} 
            onChangeText={onChangeAge}
            value={age}
            placeholderTextColor={'#4922B2'}
            placeholder="Age" 
          />
        </View>
      </View>
      <View style={styles.input}>
        <TextInput
           style={[styles.placeholder, {marginLeft: 20}]}
          onChangeText={onChangeRace}
          value={race}
          placeholderTextColor={'#4922B2'}
          placeholder="Race" 
        />
      </View>
      <View style={{backgroundColor: 'transparent', flexDirection: 'row', width: '80%', marginTop: 10}}>
        <Picker style={{backgroundColor: 'white', flex:1}}
          selectedValue={sexe}
          onValueChange={(itemValue) => {
            onChangeSexe(itemValue);
          }}>
          <Picker.Item style={styles.placeholder} label="Male" value="true" />
          <Picker.Item style={styles.placeholder} label="Femelle" value="false" />
        </Picker>
      </View>
      <View style={{backgroundColor: 'transparent', flexDirection: 'row'}}>
        <View style={{backgroundColor: 'transparent', flexDirection: 'row', width: '40%', marginTop: 10}}>
          <Checkbox value={castre} style={styles.checkbox} onValueChange={onChangeCastre}/>
          <Text style={{color: 'white'}}>
            Votre animal est-t-il castré ?
          </Text>
        </View>
        <View style={styles.input2}>
          <TextInput
            style={[styles.placeholder, {marginLeft: 20}]} 
            onChangeText={onChangePoids}
            value={poids}
            placeholderTextColor={'#4922B2'}
            placeholder="Poids" 
          />
        </View>
      </View>
      
      <View style={styles.input}>
        <TextInput 
          style={[styles.placeholder, {marginLeft: 20}]}
          onChangeText={onChangeHabitude}
          value={habitude}
          placeholderTextColor={'#4922B2'}
          placeholder="Habitudes alimentaires"
        />
      </View>
      <View style={styles.input}>
        <TextInput 
           style={[styles.placeholder, {marginLeft: 20}]}
          onChangeText={onChangeComportement}
          value={comportement}
          placeholderTextColor={'#4922B2'}
          placeholder="Comportement"
        />
      </View>

      { errorShow && 
      <Text style={{color: 'yellow'}}> Information incorrecte</Text>
      }

      <Pressable style={styles.button} onPress={submitForm}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}> Enregistrer votre animal </Text>
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
