import { StyleSheet, Text, View, TextInput, Switch, TouchableOpacity, Alert, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import  React from 'react';
import { useState, useEffect } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { db } from './components/config';
import { doc, serverTimestamp, getDocs, updateDoc, collection } from "firebase/firestore";
import styles from './components/styles';


const Separator = () => <View style={styles.separator} />;

const DetailsVisitor = ( {route, navigation} ) => {

    const { VisitorDetails } = route.params;
    
    
    const [name, setName] = useState(VisitorDetails.Nombres)
    const [lastname, setLastname] = useState(VisitorDetails.Apellidos)
    const [number, setNumber] = useState(VisitorDetails.Contacto)
    const [address, setAdress] = useState(VisitorDetails.Dirección)
    const [inviter, setInviter] = useState(VisitorDetails.Invitado)
    const [declaracion, setDeclaracion] = useState(VisitorDetails["Declaración de Fe"])
    const [remainingLetters, setRemainingLetters] = useState(MaxLettersDescription)
    const [observ, setObserv] = useState(VisitorDetails.Observaciones)
    const [fechaDeclaracion, setfechaDeclaracion] = useState(VisitorDetails["Fecha de Declaración"]);
    


    //Dates for the confirmation alert
    const fechaRegistro = () =>{
        a = VisitorDetails["Fecha_registro"].toDate()
        const day = a.getDate();
        const month = a.getMonth()+1;
        const year = a.getFullYear()
        
        return(
            `${day}/${month}/${year}`
              )
    }

    //This is the date to show in the confirmation  alert
    const DateDeclaracion = () =>{
        if(fechaDeclaracion){
            a = VisitorDetails["Fecha de Declaración"]? VisitorDetails["Fecha de Declaración"].toDate() : new Date
            const day = a.getDate();
            const month = a.getMonth()+1;
            const year = a.getFullYear()
        
        return(
            `${day}/${month}/${year}`
              )
        }
        else{
            return("No aplica")
        }
        
    }
    //End of the dates for confirmation alert


    const firstVisit = () =>{
        a = VisitorDetails["Fecha_registro"].toDate()
        const day = a.getDate();
        const month = a.getMonth()+1;
        const year = a.getFullYear()
        
        return(
            <Text style={styles.text}> {day}/{month}/{year}</Text>
            )
    }


    let MaxLettersDescription = 200

    //Date for Deeclaration day
    const DeclarationDate = () => {
        a = VisitorDetails["Fecha de Declaración"]? VisitorDetails["Fecha de Declaración"].toDate() : new Date
        const day = a.getDate(); 
        const month = a.getMonth() + 1; 
        const year = a.getFullYear();
        
        return(
            <Text style={styles.text}> {day}/{month}/{year}</Text>
        ) 
    }

    //to avoid the Undefined response in the confirmation alert
    const Filler = (a) =>{
        if(a)
            {return(a)}
        else {return("Vacío")}
    }

    //For updating the remaining letters in the Observations TextInput
    function Observations(value) {
        setObserv(value)
        const remaining = MaxLettersDescription - value.length
        setRemainingLetters(remaining)
      }

    //Kinda selfexplanatory
    function toggleDeclaracion(){
        setDeclaracion(previousState => !previousState)
        declaracion? setfechaDeclaracion("") : setfechaDeclaracion(new Date)
        }
    
    //This was created in order to not show TRUE or FALSE in the Alert of the Guardar button
    function Declarado() {
        if(declaracion==true){
            return("Si")
        }else{
            return("No")
        }
    }
    
    //Yeah, the firebase stuff
    async function UpdatingInfo(){
        
        const docToUpdate = doc(db, "Visitantes", VisitorDetails.id)

        await updateDoc(docToUpdate, {
            Nombres:name,
            Apellidos:lastname,
            Contacto: number,
            Dirección: address,
            Invitado: inviter,
            ["Declaración de Fe"]: declaracion?declaracion:"",
            Observaciones: observ?observ:"",
            ["Fecha de Declaración"]: fechaDeclaracion? fechaDeclaracion : "",
                        
        }).then(() => {
            Alert.alert('Visitante Actualizado Correctamente.')
            console.log("Data submitted")
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
    const [isSelected, setIsSelected] = useState(true)
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

    return(
        <KeyboardAwareScrollView>
            <View style={styles.container}>
            
                <View style={styles.container}>
                    <Text style={styles.textTitle}>Detalle de Visitante</Text>
                </View>    

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Nombres:</Text>
                    <TextInput
                        style={styles.inputMemberDetail}
                        placeholder="Nombre del visitante"
                        onChangeText ={(value) => setName(value)}
                        value={name}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Apellidos:</Text>
                    <TextInput
                        style={styles.inputMemberDetail}
                        placeholder="Apellido del visitante"
                        onChangeText ={(value) => setLastname(value)}
                        value={lastname}
                    />
                </View>

                
                
                

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Contacto:</Text>
                    <TextInput
                        style={styles.inputMemberDetail}
                        placeholder="Numero de Telefono"
                        keyboardType="numeric"
                        onChangeText ={(value) => setNumber(value)}
                        value={number}
                    />
                </View>


                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Dirección:</Text>
                    <TextInput
                        style={styles.inputMemberDetail}
                        placeholder="Direccion del visitante"
                        onChangeText ={(value) => setAdress(value)}
                        value={address}
                    />
                </View>

                
                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Invitado por:</Text>
                    <TextInput
                        style={styles.inputMemberDetail}
                        placeholder="Nombre del visitante"
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
                ))}
              

                
                <View style={styles.viewCounter}>
                    <Text style={styles.text}>Primera Visita: </Text>
                    {firstVisit()}
                </View>

                {VisitorDetails["Declaración de Fe"]?"":
                <View style={styles.viewCounter}>
               
                    <Text style={styles.text}>¿Ha declarado su Fe?:</Text>
                    
                        <Switch
                            trackColor={{false: '#767577', true: '#81b0ff'}}
                            thumbColor={declaracion ? '#f4f3f4' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleDeclaracion}
                            value={declaracion}
                            
                            
                        />
                   
                    <View style={styles.viewCounter}>
                        {declaracion?
                            <Text style={styles.text}>
                              Si
                            </Text>
                        :
                            <Text style={styles.text}>
                                No
                            </Text>
                        }
                        <View>
                        
                        </View>
                    </View>
                </View>
                }
                {
                //I know its better a Date Picker, but... for now, this will do
                //you can only report today as the day 
                }

                <View style={styles.viewCounter}>
                    <Text>
                        {
                            fechaDeclaracion?
                            <View style={styles.text}>
                                <Text style={styles.text}>
                                    Fecha de declaración: {DeclarationDate()}
                                </Text>
                            </View>
                        :
                            ""
                        }
                    </Text>
                </View>

                
                
                <View style={styles.viewCounter}>

                    <Text style={styles.text}>Observaciones:</Text>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={4}
                        maxLength={MaxLettersDescription}
                        style={styles.inputMemberDetail}
                        placeholder="¿Alguna intención de oración o novedad?"
                        onChangeText ={(value) => Observations(value)}
                        value={observ}
                    />

                </View>
                
                {
                    observ?
                    <Text>Caracteres Faltantes: {remainingLetters}</Text>
                    :
                    <Text>Maximo de letras: {MaxLettersDescription}</Text>
                }

            </View>

            <View style={styles.container}>
            <Separator></Separator>

            

                <Pressable
                style={styles.button}
                onPress={() => Alert.alert(
                  'Por favor, verifica que los datos estén correctos',
                  "Nombres: "+name +"\nApellidos: "+lastname +"\nNúmero: "+number+"\nDirección: "+address+"\nInvitado por: "+inviter+"\nDeclaración de Fe: "+Declarado()+"\nPrimera Visita: "+fechaRegistro()+"\nFecha de Declaración: "+DateDeclaracion()+"\nObservaciones: "+Filler(observ),
                  [
                    {
                      text: 'Si, guardar',
                      onPress: () => UpdatingInfo(),
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
                <Text style={styles.buttonText}>Actualizar</Text>
           
              </Pressable>
              
              <Separator/>
              <Separator/>
              <Separator/>
                
           </View> 
        </KeyboardAwareScrollView>
    )

 
}

export default DetailsVisitor