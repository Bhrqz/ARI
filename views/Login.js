import React, { useState } from 'react';
import {View, StyleSheet, Text, TextInput, Pressable, Image} from 'react-native';
import { db } from './components/config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Separator = () => <View style={styles.separator} />;


const Login = ({ navigation }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const Cleanfields = () =>{
        setEmail("")
        setPassword("")
    }

    return (
        <KeyboardAwareScrollView>
            
                <View style={styles.container}>

                    <Separator />
                    <Text style={styles.text}>Identificación</Text>
                    <Image source={require('../assets/LOGO PASTOR JULIO.png')} style={{width: 300, height: 200}} />
                    <Separator />
                    <Text style={styles.label} >Email de usuario</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Correo electrónico"
                        onChangeText ={(value) => setEmail(value)}
                        value={email}
                    />
                    <Text style={styles.label}>Contraseña</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Contraseña"
                        onChangeText ={(value) => setPassword(value)}
                        value={password}
                    />
                    <Separator /><Separator />
                    <Pressable
                        style={styles.button}
                        onPress={() => Alert.alert()}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </Pressable>
                    <Separator />
                    <Pressable
                        style={styles.button}
                        onPress={() => Cleanfields()}>
                        <Text style={styles.buttonText}>Limpiar</Text>
                    </Pressable>
                    <Separator />
                    <Separator />
                    <Separator />
                </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "center",
      },
    input: {
        borderColor: "gray",
        width: "75%",
        borderWidth: 1,
        margin:10,
        borderRadius: 10,
        padding: 10,
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
    label:{

    },
    text:{
        fontSize:35,
  
        
        
      },
    separator: {
        marginVertical: 10,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }
})

export default Login;
