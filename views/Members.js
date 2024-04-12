import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useState, Pressable } from "react"
import { StatusBar } from 'expo-status-bar';
import SearchFilter from './components/SearchFilter';
import styles from './components/styles';
import { collection, doc, setDoc, getDocs, query, where, getDoc, QuerySnapshot } from "firebase/firestore";
import { db } from './components/config';
import { Button, Icon } from '@rneui/base';
import { useEffect } from 'react';

const Separator = () => <View style={styles.separator} />;



export default function Members({ navigation }) {
  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [visitorName, setVisitorName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const docs = [];
      const querySnapshot = await getDocs(collection(db, "Membresía"));
      setLoadingMembers(false);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const object = {id: doc.id, ...doc.data()};
        docs.push(object);
      });
      setMembers(docs);
    }
    fetchData();

  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Separator />
        <Text style={styles.text}>Buscar un miembro</Text>

        <TextInput
          style={styles.input}
          placeholder="Filtro por nombre"
          value={visitorName}
          onChangeText={(value) => setVisitorName(value)}
        />

        <Text>{visitorName}</Text>
        <Separator />

        <View>
          {loadingMembers?
            <View>
              <Text>Cargando miembros...</Text>
              <Button title="Cargando Miembros" type="solid" loading/>
            </View>
            :
            members
              .sort((a,b) =>a.Nombres.localeCompare(b.Nombres))
              .filter(member => {
                // STILL can make this filter works.  Later
                  if (visitorName.trim() === '') {
                    return true; // Devolver true para mostrar todos los miembros
                  } else if (member) {
                    // Si el campo de entrada no está vacío, filtrar según el nombre
                    return member.Nombres.toLowerCase() == visitorName.toLowerCase();
                  }
                })        
              .map((member, index) => (
                <TouchableOpacity 
                  style={styles.lists} 
                  key={index}
                  onPress={() => {navigation.navigate("Detalles Miembro", { memberDetails: { id: member.id, ...member} })}}
                  >
                  <View>
                    <Text style={styles.textTitleList}>{member && member.Nombres}</Text>
                    <Text style={styles.textNoTitleList}>{member && member.Apellidos}</Text>
                    
                  </View>
                  <Separator/>
                </TouchableOpacity>
          ))}
        </View>

        
      </View>
    </ScrollView>
  );
}