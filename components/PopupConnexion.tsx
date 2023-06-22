import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import { Pressable, Modal } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function PopupConnexion({ isVisible, onClose }: ModalProps) {

  const handleModalClose = () => {
    onClose();
  };

  return (
    <Modal visible={isVisible} onRequestClose={handleModalClose} transparent>
      <View style={styles.view}>
        <View style={styles.container}>
        <Text> Vous devez être connecté pour accéder à cette page </Text>

        <Link href="/connexion" asChild style={styles.modalContent}>
          <Pressable>
            {({ pressed }) => (
            <Text style={{ opacity: pressed ? 0.5 : 1}}>Connexion</Text>
            )}
          </Pressable>
        </Link>
        <TouchableOpacity onPress={handleModalClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'rgba(0, 0, 0, 0.5)',
  },
  container: {
    backgroundColor: 'white',
    borderRadius : 10,
  },
  modalContent: {
    width: '80%',
    height: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});
