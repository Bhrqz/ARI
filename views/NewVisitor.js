import { StyleSheet, Text, View, TextInput, VariantsBox, TouchableOpacity, Switch, Alert, Pressable, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import  React from 'react';
import { useState, useEffect } from 'react';
import { Button, Icon } from '@rneui/base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { db } from './components/config';
import { doc, serverTimestamp, collection, getDocs, addDoc } from "firebase/firestore";
import styles from './components/styles';
//import ListOfMembers from './components/ListOfMembers';


const Separator = () => <View style={styles.separator} />;

export default function NewVisitor({navigation}) {

    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [number, onChangeNumber] = useState('')
    const [address, setAdress] = useState('')
    const [inviter, setInviter] = useState("")
    const [isSelected, setIsSelected] = useState(false)
    const [switchEnabled, setSwitchEnabled] = useState(false);
    
    function toggleSwitch(){
      setSwitchEnabled(previousState => !previousState);
      switchEnabled? setInviter(""):setInviter("Nadie. Iniciativa propia")
    }

    //Function for sending info
    async function SendingInfo(){
      
      //Code for sending the info to Firebase
      //This code updates the "prueba de la app2" document

      //  create a new document every time SendingInfo is called
      //setDoc => addDoc
      //doc => collection
      //erase PruebadelaApp2
      await addDoc(collection(db, "Visitantes"), {
              Nombres: name,
              Apellidos: lastname,
              Contacto:  number,
              Dirección: address,
              Invitado:inviter,
              Compromiso:false,
              Fecha_registro: serverTimestamp()
          }).then(() => {
              Alert.alert('Información Guardada')
              console.log("Data submitted")
              setLastname("")
              setName("")
              setAdress("")
              onChangeNumber("")
              setInviter("")
              setSwitchEnabled(false)
              navigation.navigate("Home")
          }).catch((error) =>{
              Alert.alert('Ha sucedido un error',"Por favor, intentalo de nuevo")
              console.log(error)
          })
    }
    /**
     * Inviter selector stuff
     *   
    */
    
    const [members, setMembers] = useState([]);
    const [loadingMembers, setLoadingMembers] = useState(true);
    

    useEffect(() => {
      async function fetchData() {
        const docs = [];
        const querySnapshot = await getDocs(collection(db, "Membresía"));
        setLoadingMembers(false);
        querySnapshot.forEach((doc) => {
          const object = {id: doc.id, ...doc.data()};
          docs.push(object);
        });
        setMembers(docs);
      }
      fetchData();

    }, []);

    const filteredMembers = members
      .filter(member => {
        if (inviter.trim() === '') {
          return false; // false, in order to return nothing if inviter is empty.
        } 
        else if(isSelected)
            return false;
        else{
            const fullName = `${member.Nombres} ${member.Apellidos}`.toLowerCase();
            const lastName = member.Apellidos.toLowerCase()
            return fullName.includes(inviter.toLowerCase()) || lastName.includes(inviter.toLocaleLowerCase());
      }})  
    
      /**
       * This func was created to clear de filteredmembers list after one member is selected.
       * Yes, this is not elegant at all. But, This is the first version so, 
       * I`ll go for it
       */

    const VisitorSelected = (member) =>{
      setIsSelected(true)
      setInviter(member.Nombres +" "+ member.Apellidos)

    }
    

    /**
     * End of Inviter selector stuff
     *   
    */


    return (
      <KeyboardAwareScrollView>
        {loadingMembers?
          <View style={styles.container}>

              <Separator></Separator>
              <Text>Dame un momento, porfa.</Text>
              <Button title="Cargando Miembros" type="solid" loading/>
              </View>
              :
              <View style={styles.container}>
              <Text style={styles.label} >Nombre</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Nombre del visitante"
                  onChangeText ={(value) => setName(value)}
                  value={name}
              />
              
              <Text style={styles.label}>Apellido</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Apellido del visitante"
                  onChangeText ={(value) => setLastname(value)}
                  value={lastname}
              />

              <Text style={styles.label} >Número telefónico</Text>
              <TextInput
                  style={styles.input}
                  onChangeText={(value) => onChangeNumber(value)}
                  value={number}
                  maxLength={10}
                  placeholder="Número Celular"
                  keyboardType="numeric"
                  label="hey"
              />
              
              <Text style={styles.label} >Dirección</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Dirección del visitante"
                  onChangeText ={(value) => setAdress(value)}
                  value={address}
              />

              {/**
              Lets build the inviter selector 
              */}
              


              <Text style={styles.label} >¿Quién le invitó?</Text>
              <TextInput
                  style={styles.input}
                  placeholder="Nombre del hermano o hermana"
                  onChangeText ={(value) => setInviter(value)}
                  value={inviter}
              />

              {
                filteredMembers
                  .sort((a,b) =>a.Nombres.localeCompare(b.Nombres))
                  .map((member, index) => (
                    <TouchableOpacity 
                      style={styles.lists} 
                      key={index}
                      onPress={() => {VisitorSelected(member)}}
                      >
                      <View style={styles.viewSelector}>
                        <Text style={styles.textSelectorTitle}>{member && member.Nombres}</Text>
                        <Text style={styles.textSelector}>{member && member.Apellidos}</Text>
                        
                      </View>
                      <Separator/>
                    </TouchableOpacity>
                ))
              }
              








              <Separator input={inviter} setInput={setInviter}/>
              <Text style={styles.text}>
                Si el visitante vino solo,
                {"\n"}
                sólo marque este switch 
              </Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={switchEnabled ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={switchEnabled}
                
              />

              <Separator />
              <Pressable
                style={styles.button}
                onPress={() => Alert.alert(
                  'Revisa la info antes de guardarla ',
                  "Nombre: "+name +"\nApellido: "+lastname +"\nNúmero: "+number+"\nDireccion: "+address+"\nInvitado por: "+inviter,
                  [
                    {
                      text: 'Si, guardar',
                      onPress: () => SendingInfo(),
                      style: styles.input,
                    },
                    {
                      text: 'Cancelar',
                      onPress: () => Alert.alert('Accion Cancelada'),
                      style: 'cancel',
                    },
                  ],
                  {
                    cancelable: false,
                    
                  },
                )}>
                <Text style={styles.buttonText}>Guardar visitante nuevo</Text>
           
              </Pressable>
            <Separator />
            <Separator />
            <StatusBar style="auto" />
            
          </View>
          
          }
        
      </KeyboardAwareScrollView>
    )  
  }

