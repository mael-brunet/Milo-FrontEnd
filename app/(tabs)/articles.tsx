import { StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { Text, View } from '../../components/Themed';

export default function TabOneScreen() {
  return (
    <ScrollView contentContainerStyle={[ styles.container]}>
      <View style={{width:'100%', alignItems: 'center'}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '40%', justifyContent: 'center', marginLeft: '10%'}}>
          <Text style={{marginBottom: 15,  color:'#4922B2', fontFamily: 'PurpleSmile'}}>Le début d’une aventure !</Text>
          <Text style={{marginBottom: 15, color:'#4922B2', fontFamily: 'BabyDoll'}}>Nous étions cinq au départ, partageant le même rêve. 
            Nous nous sommes associés afin de faire vivre ce projet tous ensemble</Text>
        </View>
        <Image style={{alignSelf: 'center', marginRight: '5%'}} source={require('../../assets/images/apropos1.png')}/>
      </View>
      <View style={{flexDirection: 'row'}}>
      <Image style={{alignSelf: 'center', marginLeft: '5%'}} source={require('../../assets/images/apropos2.png')}/>
        <View style={{width: '40%', justifyContent: 'center', marginRight: '10%'}}>
          <Text style={{marginBottom: 15,  color:'#4922B2', fontFamily: 'PurpleSmile', textAlign: 'right'}}>Notre mission ?</Text>
          <Text style={{marginBottom: 15, color:'#4922B2', fontFamily: 'BabyDoll', textAlign: 'right'}}>Prendre soin de vos animaux pendant que vous êtes absents ! 
          Notre structure accueille vos petits  compagnons à poils de 6h à 22h, tous les jours !</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '40%', justifyContent: 'center', marginLeft: '10%'}}>
          <Text style={{marginBottom: 15,  color:'#4922B2', fontFamily: 'PurpleSmile'}}>Une équipe de pro !</Text>
          <Text style={{marginBottom: 15, color:'#4922B2', fontFamily: 'BabyDoll'}}>Nous sommes une équipe de passionnés d'animaux, 
            diplômés et formés au soin et à la sécurité de vos compagnons</Text>
        </View>
        <Image style={{alignSelf: 'center', marginRight: '5%'}} source={require('../../assets/images/apropos3.png')}/>
      </View>
      <View style={{width:'70%', flexDirection: 'column', alignItems: 'center', marginTop: 20}}>
        <Text style={{marginBottom: 15,  color:'#4922B2', fontFamily: 'PurpleSmile'}}>Notre team en détail</Text>
        <Text style={{marginBottom: 10, color:'#4922B2', fontFamily: 'BabyDoll', textAlign: 'center'}}>Nous sommes cinq à la direction, se partageant le travail de gestion</Text>
        <Text style={{marginBottom: 10, color:'#4922B2', fontFamily: 'BabyDoll', textAlign: 'center'}}>Sur site, cinq employés se relient chaque jour pour s'occuper de vos chiens</Text>
        <Text style={{marginBottom: 10, color:'#4922B2', fontFamily: 'BabyDoll', textAlign: 'center'}}>Nous sommes également en partenariat avec un toiletteur, une comportementaliste canine et la clinique vétérinaire d'Alco</Text>
      </View>
      </View>

      <Text style={{marginBottom: 15, marginTop: 50,  color:'#4922B2', fontFamily: 'PurpleSmile'}}>Besoin de plus d'informations ?</Text>

      <Pressable style={styles.button}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>Contactez nous</Text>
      </Pressable>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      backgroundColor: 'white',
      paddingBottom: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 40,
      borderRadius: 100,
      backgroundColor: '#4922B2',
    },
  });
  