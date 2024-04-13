import { StyleSheet, Text, View, TextInput, Switch, Alert, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import  React from 'react';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { db } from './components/config';
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import styles from './components/styles';

const Separator = () => <View style={styles.separator} />;

function DetailsMember ( { route }) {

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
    const [laboral, setLaboral] = useState(memberDetails["Situacion lab"])
    const [perfil, setPerfil] = useState(memberDetails.Pêrfil)

    function toggleEditable(){
        setEditable(previousState => !previousState);        
      }
    
      function toggleCompromiso(){
        setCompromiso(previousState => !previousState);
      }

    return(
        <KeyboardAwareScrollView>
            
            <View style={styles.container}>
                

                <View>
                    <Text style={styles.textLogin}>Detalles</Text>
                </View>
                <Separator />
                <Text>Toque el Switch para habilitar la edición:</Text>
                <View style={styles.viewCounter}>
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={editable ? '#f4f3f4' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleEditable}
                        value={editable}
                        
                    />
                </View>
                {editable? <Text>Edición habilitada</Text>:<Text>Edición No habilitada</Text>}

                <Separator />

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Nombre:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.input}
                        placeholder="Nombre del visitante"
                        onChangeText ={(value) => setNombre(value)}
                        value={nombre}
                    />
                </View>
                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Apellidos:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.input}
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
                    <Text style={styles.text} >Direccion:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.input}
                        placeholder="Direccion"
                        onChangeText ={(value) => setDireccion(value)}
                        value={direccion}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Barrio:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.input}
                        placeholder="Barrio"
                        onChangeText ={(value) => setBarrio(value)}
                        value={barrio}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Comuna:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.input}
                        placeholder="Comuna"
                        onChangeText ={(value) => setComuna(value)}
                        value={comuna}
                    />
                </View>
                
                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Contacto:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.input}
                        placeholder="Contacto"
                        onChangeText ={(value) => setContacto(value)}
                        value={contacto}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Estado Civil:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.input}
                        placeholder="Estado Civil"
                        onChangeText ={(value) => setCivil(value)}
                        value={civil}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Nivel de Estudio:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.input}
                        placeholder="Nivel de Estudio"
                        onChangeText ={(value) => setEstudio(value)}
                        value={estudio}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Profesion:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.input}
                        placeholder="Profesion"
                        onChangeText ={(value) => setProfesion(value)}
                        value={profesion}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Ocupacion:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.input}
                        placeholder="Ocupacion"
                        onChangeText ={(value) => setOcupacion(value)}
                        value={ocupacion}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >CEFI:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.input}
                        placeholder="CEFI"
                        onChangeText ={(value) => setCEFI(value)}
                        value={CEFI}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Asistencia:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.input}
                        placeholder="Asistencia"
                        onChangeText ={(value) => setAsistencia(value)}
                        value={asistencia}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Ministerio:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.input}
                        placeholder="Ministerio"
                        onChangeText ={(value) => setMinisterio(value)}
                        value={ministerio}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Situacion Laboral:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.input}
                        placeholder="Situacion Laboral"
                        onChangeText ={(value) => setLaboral(value)}
                        value={laboral}
                    />
                </View>

                <View style={styles.viewCounter}>
                    <Text style={styles.text} >Perfil:</Text>
                    <TextInput
                        editable={editable}
                        style={styles.input}
                        placeholder="Perfil"
                        onChangeText ={(value) => setPerfil(value)}
                        value={perfil}
                    />
                </View>

            </View>
        </KeyboardAwareScrollView>
    )
}

export default DetailsMember