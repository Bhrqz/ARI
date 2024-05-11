import { ActivityIndicator, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
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

  const filteredMembers = members
  .filter(member => {
      if (visitorName.trim() === '') {
        return true; // true, in order to return every member
      } else{
          const fullName = `${member.Nombres} ${member.Apellidos}`.toLowerCase();
          const lastName = member.Apellidos.toLowerCase()
          return fullName.includes(visitorName.toLowerCase()) || lastName.includes(visitorName.toLocaleLowerCase());
      }
    }) 



  return (
    <ScrollView>
      <View style={styles.container}>
      
        <View style={styles.container}>
            <Text style={styles.textTitle}>Miembros</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Buscar por Nombre o Apellido"
          value={visitorName}
          onChangeText={(value) => setVisitorName(value)}
        />


        <View>
          {loadingMembers?
            <View>
              <Text>Cargando miembros...</Text>
              <ActivityIndicator size="large"/>
            </View>
            :
            filteredMembers
              .sort((a,b) =>a.Nombres.localeCompare(b.Nombres))
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