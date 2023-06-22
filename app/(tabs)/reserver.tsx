import { StyleSheet, ScrollView, TouchableOpacity, Pressable, Image } from 'react-native';
import { Text, View } from '../../components/Themed';
import PopupConnexion from '../../components/PopupConnexion';
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import Slider from "@react-native-community/slider";
import Checkbox from 'expo-checkbox';

export default function TabTwoScreen() {
  
  const [isVisible, setIsVisible] = useState(false);
  const [animaux, setAnimaux] = useState({});
  const [selectedIconId, setSelectedIconId] = useState('');

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [id, setId] = useState('');
  const [id_animal, setIdAnimal] = useState('');

  const [selectedHour, setSelectedHour] = useState(6);4

  const [forfait, setForfait] = useState(1);
  const [prix, setPrix] = useState(0);
  const [toilettage, setToilettage] = useState(false);
  const [nourriture, onChangeNourriture] = useState(false);
  const [toilettagePetit, setToilettagePetit] = useState(false);
  const [toilettageGrand, setToilettageGrand] = useState(false);
  
  const handleHourChange = (hour: any) => {
    setSelectedHour(hour);
  };

  useEffect(() => {
    calculerPrix()
  }, [forfait, nourriture, toilettagePetit, toilettageGrand]);
  
  const router = useRouter();

  useEffect(() => {
    const getInfos = async() => {
      await SecureStore.getItemAsync('login_key').then(async function(key){
        if(key!= null) {
          const decodedKey: any = jwtDecode(key as any)
          setId(decodedKey.sub)
          await axios.get('http://10.0.2.2:3000/animaux/' + decodedKey.sub )
          .then(async function (response) {
            setAnimaux(response.data);
          })
        }
      })
    }
    getInfos()
    
  }, [])

  const isIconSelected = (id: string) => {
    return selectedIconId === id;
  };

  const handleForfaitChange = (newForfait: any) => {
    setForfait(newForfait);
    setSelectedHour(6)
  };

  const toggleModal = () => {
    setIsVisible(true);
  };

  const handleModalClose = () => {
    setIsVisible(false);
  };

  
  const onChangeToilettage = (value: any) => {
    setToilettage(value);
    if (!value) {
      setToilettagePetit(false);
      setToilettageGrand(false);
    }
  };

  const onChangeToilettageGrand = (value: any) => {
    setToilettageGrand(value);
    if (value) {
      setToilettagePetit(false);
    }
  };

  const onChangeToilettagePetit = (value: any) => {
    setToilettagePetit(value);
    if (value) {
      setToilettageGrand(false);
    }
  };

  const handleIconPress = (id: string, animal_id: string) => {
    setSelectedIconId(id);
    setIdAnimal(animal_id);
  };

  const handleDateChange = (event:any, date:any) => {
    if (date !== undefined) {
      setSelectedDate(date);
    }
    setIsDatePickerVisible(false);
  };

  const toggleDatePicker = () => {
    setIsDatePickerVisible(!isDatePickerVisible);
  };

  const calculerPrix = () => {
    let nouveauPrix = 0;
    if(forfait == 1) {
      nouveauPrix += 10
    }
    else if(forfait == 2) {
      nouveauPrix += 15
    }
    else if(forfait == 3) {
      nouveauPrix += 20
    }
    else if(forfait == 4) {
      nouveauPrix += 25
    }
    else if(forfait == 5) {
      nouveauPrix += 30
    }
    else if(forfait == 10) {
      nouveauPrix += 50
    }
    if(toilettage) {
      if(toilettagePetit) {
        nouveauPrix += 40
      }
      else if(toilettageGrand) {
        nouveauPrix += 60
      }
    }
    if(nourriture) {
      nouveauPrix += 4
    }
    setPrix(nouveauPrix)
  }

  const submitForm = () => {
    axios.post('http://10.0.2.2:3000/reservations/', {
      id_utilisateur: id,
      id_animal: id_animal,
      date: selectedDate.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: '2-digit' }),
      heure_debut: selectedHour.toString() + ':00',
      heure_fin: (selectedHour + forfait).toString() + ':00',  
      prix: prix,
    })
    .then((response) => {
      router.replace("/connexion");
    })
  }

  return (
      <ScrollView contentContainerStyle={[ styles.container]}>
        <View style={{width:'100%', alignItems: 'center'}}>
      <Text style={{ fontSize: 16, fontFamily: 'PurpleSmile', color: '#4922B2', alignSelf: 'flex-start', marginLeft: 20, marginTop: 10 }}>VOS ANIMAUX</Text>
      <View style={styles.scrollViewContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Object.entries(animaux).map(([id, animal]: [string, any]) => (
            <TouchableOpacity style={styles.chien} activeOpacity={1} key={id} onPress={() => handleIconPress(id, animal._id)}>
              <View style={[styles.icon, isIconSelected(id) && styles.selectedIcon]}>
                <Image style={styles.picture} source={require('../../assets/images/profil.png')}/>
              </View>
              <Text style={styles.noms}>{animal.nom}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity onPress={toggleDatePicker} activeOpacity={1}>
        <View style={styles.datePickerButton}>
          <Text style={styles.datePickerButtonText}>{selectedDate.toDateString()}</Text>
        </View>
      </TouchableOpacity>
      {isDatePickerVisible && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          minimumDate={new Date()}
          onChange={handleDateChange}
          locale={'fr'}
        />
      )}
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 16, marginBottom: 10, color:'#4922B2', fontWeight: 'bold' }}>Heure de début {selectedHour}:00</Text>
      <Slider
        style={{ width: 200, marginBottom: 10 }}
        minimumValue={6}
        maximumValue={22 - forfait}
        step={1}
        value={selectedHour}
        onValueChange={handleHourChange}
        minimumTrackTintColor="#4922B2"
        maximumTrackTintColor="#4922B2"
        thumbTintColor="#4922B2"
      />
      </View>
      <View style={styles.options}>
      <Text style={{color:'#4922B2', fontWeight: 'bold', alignSelf: 'flex-start', marginTop: 10, marginLeft: 20, marginBottom: 20}}>CHOISISSEZ VOTRE FORFAIT</Text>
      <View style={{height:200}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[
            styles.chien, styles.forfait,
            forfait === 1 && { borderWidth: 5, borderColor: '#F7931E' },
          ]}
          activeOpacity={1}
          onPress={() => handleForfaitChange(1)}
        >
          <View style={{ backgroundColor: 'transparent', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 10 }}>Forfait</Text>
            <Text style={{ color: 'white', fontSize: 36, fontWeight: 'bold' }}>1h</Text>
            <Text style={{ color: 'white', fontSize: 36 }}>10€</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.chien, styles.forfait,
            forfait === 2 && { borderWidth: 5, borderColor: '#F7931E' },
          ]}
          activeOpacity={1}
          onPress={() => handleForfaitChange(2)}
        >
          <View style={{ backgroundColor: 'transparent', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 10 }}>Forfait</Text>
            <Text style={{ color: 'white', fontSize: 36, fontWeight: 'bold' }}>2h</Text>
            <Text style={{ color: 'white', fontSize: 36 }}>15€</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.chien, styles.forfait,
            forfait === 3 && { borderWidth: 5, borderColor: '#F7931E' },
          ]}
          activeOpacity={1}
          onPress={() => handleForfaitChange(3)}
        >
          <View style={{ backgroundColor: 'transparent', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 10 }}>Forfait</Text>
            <Text style={{ color: 'white', fontSize: 36, fontWeight: 'bold' }}>3h</Text>
            <Text style={{ color: 'white', fontSize: 36 }}>20€</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.chien, styles.forfait,
            forfait === 4 && { borderWidth: 5, borderColor: '#F7931E' },
          ]}
          activeOpacity={1}
          onPress={() => handleForfaitChange(4)}
        >
          <View style={{ backgroundColor: 'transparent', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 10 }}>Forfait</Text>
            <Text style={{ color: 'white', fontSize: 36, fontWeight: 'bold' }}>4h</Text>
            <Text style={{ color: 'white', fontSize: 36 }}>25€</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.chien, styles.forfait,
            forfait === 5 && { borderWidth: 5, borderColor: '#F7931E' },
          ]}
          activeOpacity={1}
          onPress={() => handleForfaitChange(5)}
        >
          <View style={{ backgroundColor: 'transparent', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 10 }}>Forfait</Text>
            <Text style={{ color: 'white', fontSize: 36, fontWeight: 'bold' }}>5h</Text>
            <Text style={{ color: 'white', fontSize: 36 }}>30€</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.chien, styles.forfait,
            forfait === 10 && { borderWidth: 5, borderColor: '#F7931E' },
          ]}
          activeOpacity={1}
          onPress={() => handleForfaitChange(10)}
        >
          <View style={{ backgroundColor: 'transparent', alignItems: 'center'}}>
            <Text style={{ color: 'white', fontWeight: 'bold', marginTop: 10 }}>Forfait</Text>
            <Text style={{ color: 'white', fontSize: 36, fontWeight: 'bold' }}>10h</Text>
            <Text style={{ color: 'white', fontSize: 36 }}>50€</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
      </View>
      <View style={{width:'100%', marginTop: 50}}>
        <View style={{flexDirection: 'row', marginLeft: '10%', width:'80%', marginBottom: 10}}>
          <Checkbox value={toilettage} style={styles.checkbox} onValueChange={onChangeToilettage}/>
          <Text style={{color:'#4922B2', fontWeight: 'bold'}}> Toilettage <Text style={{color:'#4922B2', fontSize: 10, fontWeight: 'normal'}}> (Pour déterminer s’il s’agit d’un chien de grande ou petite taille, rendez-vous sur le site ....) </Text> </Text>
        </View>
        <View style={{flexDirection: 'row', marginLeft: '20%', marginBottom: 10}}>
          <Checkbox value={toilettageGrand}  disabled={!toilettage} style={styles.checkbox} onValueChange={onChangeToilettageGrand}/>
          <Text style={{color:'#4922B2', opacity: 0.5}}> Grand chien +50cm </Text>
          <Text style={{color:'#4922B2', opacity: 0.5}}> + 60€ </Text>
        </View>
        <View style={{flexDirection: 'row', marginLeft: '20%', marginBottom: 20}}>
          <Checkbox value={toilettagePetit}  disabled={!toilettage} style={styles.checkbox} onValueChange={onChangeToilettagePetit}/>
          <Text style={{color:'#4922B2', opacity: 0.5}}> Petit chien -50cm </Text>
          <Text style={{color:'#4922B2', opacity: 0.5}}> + 40€ </Text>
        </View>
        <View style={{flexDirection: 'row', marginLeft: '10%', width:'70%', marginBottom: 40}}>
          <Checkbox value={nourriture} style={styles.checkbox} onValueChange={onChangeNourriture}/>
          <Text style={{color:'#4922B2', fontWeight: 'bold'}}> Nourriture en plus <Text style={{color:'#4922B2', fontSize: 10, fontWeight: 'normal'}}> (vous ne fournissez pas la nourriture, elle est donc à votre charge)</Text></Text>
          
          <Text style={{color:'#4922B2', fontWeight: 'bold'}}> + 4€ </Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignSelf: 'flex-end', marginBottom: 20, marginRight: 10}}>
        <Text  style={{color:'#4922B2', fontWeight: 'bold', fontSize: 18}}> Total : </Text>
        <Text  style={{color:'#4922B2', fontWeight: 'bold', fontSize: 36}}> {prix} € </Text>
      </View>
    </View>
      <Pressable onPress={submitForm} style={styles.button}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}> Réserver </Text>
      </Pressable>
      <PopupConnexion isVisible={isVisible} onClose={handleModalClose} />
      </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'white'  ,
    paddingBottom: 20,
  },
  background: {
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  forfait: {
    borderRadius: 10, 
    height: 200, 
    width: 120,
    marginLeft: 20,
    marginRight: 20,
  },
  placeholder: {
    opacity: 0.5, 
    fontSize:18
  },
  scrollViewContainer: {
    backgroundColor: '#4922B2',
    width: '100%',
    alignItems: 'center',
    height: 150,
    marginTop: 10,
  },
  icon: {
    height: 100,
    width: 100,
    borderRadius: 180,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  picture: {
    height: 90,
    width: 90,
    borderRadius: 180,
    backgroundColor: 'grey',
  },
  noms: {
    fontSize: 16, 
    fontFamily: 'PurpleSmile', 
    color: '#F7931E',
  },
  chien: {
    flexDirection: 'column', 
    alignItems: 'center', 
    backgroundColor: '#4922B2',
  },
  selectedIcon: {
    backgroundColor: '#F7931E',
  },
  datePickerButton: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  datePickerButtonText: {
    fontSize: 16,
    color: '#4922B2',
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
  options: {
    width: '80%', 
    backgroundColor: 'white', 
    borderRadius: 10, 
    alignItems: 'center', 
    height: 550, 
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  checkbox: {
    backgroundColor: 'white',
    borderColor: '#F7931E',
    marginRight: 5,
  }
});
