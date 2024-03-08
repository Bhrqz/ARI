import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';


const Separator = () => <View style={styles.separator} />;

export default function Home({ navigation }) {
    return (
      <View style={styles.container}>
          <Text style={styles.text}> 
            {'\n'}  
            ¡Bienvenido! 
          </Text>
          
          <StatusBar style="auto" />
          <Separator />
          <Button
            title="Nuevo visitante"
            style={styles.button}
            onPress={() => navigation.navigate('Nuevo Visitante')}
          />
          <Separator />
          <Button
            title="Editar visitante"
            onPress={() => navigation.navigate('Editar Visitante')}
          />
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

      marginBottom:10
      
      
    },
    button:{
      width:100
    },
    separator: {
      marginVertical: 15,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    }
  });