import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';


const Separator = () => <View style={styles.separator} />;

export default function EditVisitor({ navigation }) {
    return (
      <View style={styles.container}>
          <Text style={styles.text}> 
            {'\n'}  
            Editar un visitante 
          </Text>
          
          
          
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