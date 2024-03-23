import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useState, Pressable } from "react"
import { StatusBar } from 'expo-status-bar';
import SearchFilter from './components/SearchFilter';
import styles from './components/styles';
import { collection, doc, setDoc, getDocs, query, where, getDoc, QuerySnapshot } from "firebase/firestore";
import { db } from './components/config';
import { Button, ListItem } from '@rneui/base';
import { useEffect } from 'react';

const Separator = () => <View style={styles.separator} />;



export default function EditVisitor({ navigation }) {
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
        const object = doc.data();
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
        <Text style={styles.text}>Editar un visitante</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre del visitante"
          value={visitorName}
          onChangeText={(value) => setVisitorName(value)}
        />

        
        <Separator />

        <View>
          {loadingMembers?
            <Text>Cargando miembros</Text>:
            members.map((member, index) => (
              <TouchableOpacity style={styles.lists}>
                <Text>{member && member.Nombres}</Text>
                <Separator/>
              </TouchableOpacity>
          ))}
        </View>

        
      </View>
    </ScrollView>
  );
}