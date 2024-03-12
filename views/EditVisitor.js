import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useState } from "react"
import { StatusBar } from 'expo-status-bar';
import SearchFilter from './components/SearchFilter';



const Separator = () => <View style={styles.separator} />;



export default function EditVisitor({ navigation }) {

    const [search, setSearch] = useState("")

    function Search() {
      names = Firebase.db.collection("Membresìa").get()
    }

    return (
      <View style={styles.container}>
          <Separator />
          <Text style={styles.text}> 
            Editar un visitante 
          </Text>
          
          <TextInput
                  style={styles.input}
                  placeholder="Nombre del visitante"
                  onChangeText ={(value) => setSearch(value)}
                  value={search}
              />

          <SearchFilter input={search} setInput={setSearch}/>
          
      </View>
    )  
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: "center",
      justifyContent: 'flex-start',
    },
    text:{
      fontSize:35,
      marginBottom:10
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#3a87cc',
    },
    buttonText: {
      fontSize: 18,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
    separator: {
      marginVertical: 15,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    input: {
      borderColor: "gray",
      width: "75%",
      borderWidth: 1,
      margin:10,
      borderRadius: 10,
      padding: 10,
    },
  });