import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './components/styles';


const Separator = () => <View style={styles.separator} />;

export default function Home({ navigation }) {
    return (
      <View style={styles.container}>
          <Text style={styles.textLogin}> 
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

