import { StyleSheet, Text, View, Button, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './components/styles';


const Separator = () => <View style={styles.separator} />;
const SeparatorNoLine = () => <View style={styles.separatorNoLine} />;
const Line = () => <Text>---------------------------</Text>;

export default function Home({ navigation }) {
    return (
      <View style={styles.container}>
      <View >
          <Text style={styles.textLogin}> 
          Menú Principal  
          </Text>
          
          
          <StatusBar style="auto" />
          <SeparatorNoLine/>
          <Pressable
            style={styles.buttonHome1}
            onPress={() => navigation.navigate('Nuevo Visitante')}>
              <Text style={styles.buttonText}>Registro de Visitante</Text>
          </Pressable>
          <SeparatorNoLine/>
          <Pressable
            style={styles.buttonHome1}
            onPress={() => navigation.navigate('Visitantes')}>
              <Text style={styles.buttonText}>Ver Visitantes</Text>
          </Pressable>
          <SeparatorNoLine/>
          <Separator />
          <SeparatorNoLine/>
          <Pressable
            style={styles.buttonHome3}
            onPress={() => navigation.navigate('Miembros')}>
              <Text style={styles.buttonText}>Actualizar Miembro</Text>
          </Pressable>
          <SeparatorNoLine/>
          <Separator />
          <SeparatorNoLine/>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Creación de Anomalia')}>
              <Text style={styles.buttonText}>Registro de Anomalía</Text>
          </Pressable>
          <SeparatorNoLine/>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Anomalias')}>
              <Text style={styles.buttonText}>Ver Anomalías</Text>
          </Pressable>
          <SeparatorNoLine/>
          <Separator />
          <SeparatorNoLine/>
          <Pressable
            style={styles.buttonHome2}
            onPress={() => navigation.navigate('Número de asistentes')}>
              <Text style={styles.buttonText}>Registro de Asistencia</Text>
          </Pressable>
          </View>
      </View>
    )  
  }

