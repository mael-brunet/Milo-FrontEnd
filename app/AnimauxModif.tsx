import { StyleSheet, Image, Dimensions, Pressable, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { Foundation } from '@expo/vector-icons'; 
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

interface RouteParams {
  id?: string;
}

export default function AnimauxModif() {
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

  const [name, onChangeName] = useState(animal.nom);
  const [age, onChangeAge] = useState(animal.age);
  const [poids, onChangePoids] = useState(animal.poids);
  const [castre, onChangeCastre] = useState(animal.is_castre);
  const [habitude, onChangeHabitude] = useState(animal.habitude);
  const [comportement, onChangeComportement] = useState(animal.comportement);
  const [errorShow, setError] = useState(false);

  const router = useRouter();

  const submitForm = () => {
    axios.patch('http://10.0.2.2:3000/animaux/', {
      id_utilisateur: animal.id_utilisateur,
      nom: name,
      age: age,
      race: animal.race,
      sexe: animal.sexe,
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
      <View style={styles.input}>
        <TextInput
          style={styles.placeholder} 
          placeholderTextColor={'#4922B2'}
          onChangeText={onChangeName}
          value={animal.nom}
          placeholder="Nom" 
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.placeholder} 
          placeholderTextColor={'#4922B2'}
          onChangeText={onChangeAge}
          value={animal.age}
          placeholder="Age" 
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.placeholder} 
          onChangeText={onChangeName}
          value={animal.race}
          selectTextOnFocus={false}
          editable={false}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.placeholder} 
          onChangeText={onChangeName}
          value={animal.sexe}
          selectTextOnFocus={false}
          editable={false}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.placeholder} 
          placeholderTextColor={'#4922B2'}
          onChangeText={onChangePoids}
          value={animal.poids}
          placeholder="Poids" 
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.placeholder} 
          placeholderTextColor={'#4922B2'}
          onChangeText={onChangeCastre}
          value={animal.is_castre}
          placeholder="Votre animal est-il castré ?" 
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.placeholder} 
          placeholderTextColor={'#4922B2'}
          onChangeText={onChangeHabitude}
          value={animal.habitude}
          placeholder="Habitudes alimentaires" 
        />
      </View>
      <View style={styles.input}>
        <TextInput
          style={styles.placeholder} 
          placeholderTextColor={'#4922B2'}
          onChangeText={onChangeComportement}
          value={animal.comportement}
          placeholder="Comportement et autre" 
        />
      </View>
      { errorShow && 
      <Text style={{color: 'yellow'}}> Erreur </Text>
      }

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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 40,
    borderRadius: 100,
    backgroundColor: '#4922B2',
  },
  placeholder: {
    opacity: 0.5, 
    fontSize:18
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
