import { StyleSheet, Text, View, TextInput, Switch, Alert, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import  React from 'react';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { db } from './components/config';
import { doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import styles from './components/styles';

const Separator = () => <View style={styles.separator} />;

function DetailsMember ( { route, navigation }) {

    const { memberDetails } = route.params;

    console.log(memberDetails)

    const [editable, setEditable] = useState(false)
    const [nombre, setNombre] = useState(memberDetails.Nombres)
    const [apellido, setApellido] = useState(memberDetails.Apellidos)
    const [direccion, setDireccion] = useState(memberDetails.Dirección)
    const [barrio, setBarrio] = useState(memberDetails.Barrio)
    const [comuna, setComuna] = useState(memberDetails.Comuna)
    const [contacto, setContacto] = useState(memberDetails.Contacto)
    const [civil, setCivil] = useState(memberDetails["Estado Civil"])
    const [estudio, setEstudio] = useState(memberDetails["Nivel Estudio"])
    const [profesion, setProfesion] = useState(memberDetails.Profesión)
    const [ocupacion, setOcupacion] = useState(memberDetails.Ocupación)
    const [CEFI, setCEFI] = useState(memberDetails.CEFI)
    const [asistencia, setAsistencia] = useState(memberDetails.Asistencia)
    const [ministerio, setMinisterio] = useState(memberDetails.Ministerio)
    const [laboral, setLaboral] = useState(memberDetails["Situación Lab"])
    const [perfil, setPerfil] = useState(memberDetails.Perfil)

    function toggleEditable(){
        setEditable(previousState => !previousState);        
    }
    
    async function UpdatingInfo(){
        
        const docToUpdate = doc(db, "Membresía", memberDetails.id)

        await updateDoc(docToUpdate, {
            Nombres:nombre?nombre:"",
            Apellidos:apellido?apellido:"",
            Dirección:direccion?direccion:"",
            Barrio:barrio?barrio:"",
            Comuna:comuna?comuna:"",
            Contacto:contacto?contacto:"",
            "Estado Civil":civil?civil:"",
            "Nivel Estudio":estudio?estudio:"",
            Profesión:profesion?profesion:"",
            Ocupación:ocupacion?ocupacion:"",
            CEFI:CEFI?CEFI:"",
            Asistencia:asistencia?asistencia:"",
            Ministerio:ministerio?ministerio:"",
            "Situación Lab":laboral?laboral:"",
            Perfil:perfil?perfil:""

        }).then(() => {
            Alert.alert('Miembro Actualizado')
            console.log("Data submitted")
            navigation.navigate("Home")
        }).catch((error) =>{
              Alert.alert('Ha sucedido un error',"Por favor, intentalo de nuevo")
              console.log(error)
          })
    }
    
    
    return(
        <KeyboardAwareScrollView>
            
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.textLogin}>Detalle Miembro</Text>
                </View>
                
                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Habilitar edición:</Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={editable ? '#f4f3f4' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleEditable}
                        value={editable}
                    />
                    {editable? <Text style={styles.text}>Si</Text>:<Text style={styles.text}>No</Text>}
                </View>
                

                
                
                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Nombres:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.inputMemberDetail}
                        placeholder="Nombre del visitante"
                        onChangeText ={(value) => setNombre(value)}
                        value={nombre}
                    />
                </View>
                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Apellidos:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.inputMemberDetail}
                        placeholder="Nombre del visitante"
                        onChangeText ={(value) => setApellido(value)}
                        value={apellido}
                    />
                </View>
                
                
                {/** Need to find a way to show the Date. Maybe not a TextInput
                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Fecha de nacimiento:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.input}
                        placeholder="Fecha de Nacimiento"
                        onChangeText ={(value) => setBirthday(value)}
                        value={birthday}
                    />
                </View>
                */}

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Dirección:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.inputMemberDetail}
                        placeholder="Direccion"
                        onChangeText ={(value) => setDireccion(value)}
                        value={direccion}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Barrio:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.inputMemberDetail}
                        placeholder="Barrio"
                        onChangeText ={(value) => setBarrio(value)}
                        value={barrio}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Comuna:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.inputMemberDetail}
                        placeholder="Comuna"
                        onChangeText ={(value) => setComuna(value)}
                        value={comuna.toString()}
                    />
                </View>
                
                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Contacto:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.inputMemberDetail}
                        placeholder="Contacto"
                        keyboardType="numeric"
                        onChangeText ={(value) => setContacto(value)}
                        value={contacto.toString()}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Estado Civil:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.inputMemberDetail}
                        placeholder="Estado Civil"
                        onChangeText ={(value) => setCivil(value)}
                        value={civil}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Nivel de Estudio:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.inputMemberDetail}
                        placeholder="Nivel de Estudio"
                        onChangeText ={(value) => setEstudio(value)}
                        value={estudio}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Profesión:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.inputMemberDetail}
                        placeholder="Profesion"
                        onChangeText ={(value) => setProfesion(value)}
                        value={profesion}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Ocupación:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.inputMemberDetail}
                        placeholder="Ocupacion"
                        onChangeText ={(value) => setOcupacion(value)}
                        value={ocupacion}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >CEFI:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.inputMemberDetail}
                        placeholder="CEFI"
                        onChangeText ={(value) => setCEFI(value)}
                        value={CEFI}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Asistencia:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.inputMemberDetail}
                        placeholder="Asistencia"
                        onChangeText ={(value) => setAsistencia(value)}
                        value={asistencia}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Ministerio:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.inputMemberDetail}
                        placeholder="Ministerio"
                        onChangeText ={(value) => setMinisterio(value)}
                        value={ministerio}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Situación Laboral:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.inputMemberDetail}
                        placeholder="Situacion Laboral"
                        onChangeText ={(value) => setLaboral(value)}
                        value={laboral}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Perfil:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.inputMemberDetail}
                        placeholder="Perfil"
                        onChangeText ={(value) => setPerfil(value)}
                        value={perfil}
                    />
                </View>
                <Separator></Separator>
                <Pressable
                style={styles.button}
                onPress={() => Alert.alert(
                  '¿Estás seguro?',
                  "La información será actualizada",
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

              <Separator></Separator>
              
            </View>
        </KeyboardAwareScrollView>
    )
}

export default DetailsMember