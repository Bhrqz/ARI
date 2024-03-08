import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './views/Home';
import NewVisitor from './views/NewVisitor';
import EditVisitor from './views/EditVisitor';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator> 

        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: 'Nombre de la Iglesia' }} />

        <Stack.Screen 
          name="Nuevo Visitante" 
          component={NewVisitor} />
        
        <Stack.Screen
          name= "Editar Visitante"
          component={EditVisitor} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


