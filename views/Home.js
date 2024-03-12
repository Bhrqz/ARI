import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';


const Separator = () => <View style={styles.separator} />;

export default function Home({ navigation }) {
    return (
      <View style={styles.container}>
          <Text style={styles.text}> 
            {'\n'}  
            Bienvenido 
          </Text>
          
          <StatusBar style="auto" />
          <Separator />

          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Nuevo Visitante')}>
              <Text style={styles.buttonText}>Nuevo visitante</Text>
           
          </Pressable>
          <Separator />
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Editar Visitante')}>
              <Text style={styles.buttonText}>Editar visitante</Text>
           
          </Pressable>
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
    }
  });