import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './components/styles';


const Separator = () => <View style={styles.separator} />;

export default function Home({ navigation }) {
    return (
      <View style={styles.container}>
          <Text style={styles.textLogin}> 
            Bienvenido 
          </Text>
          <Separator></Separator>
          <Text style={styles.textTitleList}> 
            Menú Principal 
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
            onPress={() => navigation.navigate('Visitantes')}>
              <Text style={styles.buttonText}>Lista Visitantes</Text>
          </Pressable>
          <Separator />
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Miembros')}>
              <Text style={styles.buttonText}>Lista de miembros</Text>
          </Pressable>
          <Separator />
          <Separator />
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Creación de Anomalia')}>
              <Text style={styles.buttonText}>Nueva Anomalía</Text>
          </Pressable>
          <Separator />
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Anomalias')}>
              <Text style={styles.buttonText}>Ver Anomalías</Text>
          </Pressable>
          <Separator />
          <Separator />
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Creación de Conteo')}>
              <Text style={styles.buttonText}>Registrar Asistencia</Text>
          </Pressable>

      </View>
    )  
  }

