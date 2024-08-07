import { ActivityIndicator, Text, View, TextInput, VariantsBox, TouchableOpacity, Switch, Alert, Pressable, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import  React from 'react';
import { useState, useEffect } from 'react';
import { Button, Icon } from '@rneui/base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { db } from './components/config';
import { doc, serverTimestamp, collection, getDocs, addDoc } from "firebase/firestore";
import styles from './components/styles';
import { Dropdown } from 'react-native-element-dropdown';


const Separator = () => <View style={styles.separator} />;

export default function NewVisitor({navigation}) {

    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [number, onChangeNumber] = useState('')
    const [address, setAdress] = useState('')
    const [inviter, setInviter] = useState("")
    const [isSelected, setIsSelected] = useState(false)
    const [switchEnabled, setSwitchEnabled] = useState(false);
    const [gender, setGender] = useState("");
    
   
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
              Contacto:  number.toString(),
              Dirección: address,
              Invitado:inviter,
              Compromiso:false,
              Genero:gender?gender.label:"No Registrado",
              Fecha_registro: serverTimestamp()
          }).then(() => {
              Alert.alert('Visitante Registrado Correctamente')
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

    const ChangingInviter = (value) =>{
      setInviter(value)
      setIsSelected(false)
    }
    

    /**
     * End of Inviter selector stuff
     *   
    */

    //Gender selector stuff
    const genderOptions =[
      { label: 'Masculino', value: '1' },
      { label: 'Femenino', value: '2' },
      ]
  
    const renderItem = item => {
      return(
        <View>
          <Text style={styles.textSelector}>{item.label}</Text>
        </View>
      )
    }
    // End of Gender selector things



    //Start of the PEV
    //Previous Existence Verifier

    const [visitors, setVisitors] = useState([]);
    const [loadingVisitors, setLoadingVisitors] = useState(true);
    const [duplicate, setDuplicate] = useState(false)

    useEffect(() => {
      async function fetchData() {
        const docs = [];
        const querySnapshot = await getDocs(collection(db, "Visitantes"));
        setLoadingVisitors(false);
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          const object = {id: doc.id, ...doc.data()}
          docs.push(object);
        });
        setVisitors(docs);
      }
      fetchData();
  
    }, []);

    const hasSameNameOrLastname = () => {
      for (const visitor of visitors) {
        const visitorName = `${visitor.Nombres} `.toLowerCase();
        const visitorLastName = `${visitor.Apellidos}`.toLowerCase();
        if (name && lastname && visitorName.includes(name.toLowerCase()) && visitorLastName.includes(lastname.toLowerCase())) {
          return true; 
        }
      }
      return false; }

    //End of the PEV

    //In order to show the date of registration in the
    //confirmation Alert
    const showDate = () =>{
      a = new Date
      const day = a.getDate();
      const month = a.getMonth()+1;
      const year = a.getFullYear()
      
      return(
        `${day}/${month}/${year}`
          )
    }

    console.log("HEYRYERYEYEYR"+gender.label)

    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <Text style={styles.textTitle}>Registro de Nuevo Visitante</Text>
        </View>
        {(loadingMembers && loadingVisitors)?
          <View style={styles.container}>

              <Separator></Separator>
              <Text>Cargando Información.</Text>
              <ActivityIndicator size="large"/>
          </View>
              :
              <View style={styles.container}>
                <View style={styles.viewCounter}>
                  <Text style={styles.text} >Nombres:</Text>
                  <TextInput
                      style={styles.input}
                      placeholder="Nombres del visitante"
                      onChangeText ={(value) => setName(value)}
                      value={name}
                  />
                </View>

                <View style={styles.viewCounter}>
                  <Text style={styles.text}>Apellidos:</Text>
                  <TextInput
                      style={styles.input}
                      placeholder="Apellidos del visitante"
                      onChangeText ={(value) => setLastname(value)}
                      value={lastname}
                  />
                </View>

           
                {hasSameNameOrLastname()? 
                  <View>
                    <Text style={styles.textSmall}>
                      Es posible que ya esté registrada esta persona.
                    </Text>
                    <Text style={styles.textSmall}>
                      Por favor, verifica si ha venido antes.
                    </Text>
                  </View>
                  :
                  null
                }
                
          

                <View style={styles.viewCounter}>
                  <Text style={styles.text} >Contacto:</Text>
                  <TextInput
                      style={styles.input}
                      onChangeText={(value) => onChangeNumber(value)}
                      value={number}
                      maxLength={10}
                      placeholder="Número Celular"
                      keyboardType="numeric"
                      label="hey"
                  />
                </View>
              
                <View style={styles.viewCounter}>
                  <Text style={styles.text} >Dirección:</Text>
                  <TextInput
                      style={styles.input}
                      placeholder="Dirección del visitante"
                      onChangeText ={(value) => setAdress(value)}
                      value={address}
                  />
                </View>

                <View style={styles.viewCounter}>
                  <Text style={styles.text} >Género: </Text>
                  <Dropdown
                    selectedTextStyle={styles.selectedTextStyle}
                    style={styles.dropdownLittle}
                    placeholderStyle={styles.textNoTitleList}
                    data={genderOptions}
                    labelField="label"
                    valueField="value"
                    placeholder="Elija una opción"
                    value={gender}
                    maxHeight={300}
                    onChange={ (value) => {setGender(value)}}
                    renderItem={renderItem}
                  />
                </View>
             
                <View style={styles.viewCounter}>
                  <Text style={styles.text} >Invitado por:</Text>
                  <TextInput
                      style={styles.input}
                      placeholder="Nombre del hermano o hermana"
                      onChangeText ={(value) => ChangingInviter(value)}
                      value={inviter}
                  />
                </View>

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
                        <Text style={styles.textNoTitleList}>{member && member.Apellidos}</Text>
                        
                      </View>
                      <Separator/>
                    </TouchableOpacity>
                ))
              }
              
              <Separator></Separator>
              <View style={styles.viewCounter}>
                <Text style={styles.text}>
                  Si el visitante vino solo,
                  {"\n"}
                  activa este switch:
                </Text>
                <Switch
                  trackColor={{false: '#767577', true: '#81b0ff'}}
                  thumbColor={switchEnabled ? '#f4f3f4' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSwitch}
                  value={switchEnabled}
                  
                />
              </View>
              <Separator />
              <Pressable
                style={styles.button}
                onPress={() => Alert.alert(
                  'Por favor, verifica que los datos estén correctos',
                  "Nombres: "+name +"\nApellidos: "+lastname +"\nContacto: "+number+"\nDirecciòn: "+address+"\nGénero: "+gender.label+"\nInvitado por: "+inviter+"\nFecha de registro: "+showDate(),
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
                <Text style={styles.buttonText}>Guardar Registro</Text>
           
              </Pressable>
            <Separator />
            <Separator />
            <StatusBar style="auto" />
            
          </View>
          
          }
        
      </KeyboardAwareScrollView>
    )  
  }

