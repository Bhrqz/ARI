import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './views/Home';
import NewVisitor from './views/NewVisitor';
import EditVisitor from './views/EditVisitor';
import Login from './views/Login';
import { useState } from 'react';



const Stack = createNativeStackNavigator();

export default function App() {

  const [user, setUser] = useState(false)


  return (
    <NavigationContainer>
      <Stack.Navigator> 

      <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ title: 'Nombre de la Iglesia' }} />

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


// we need to implement this:
/**<Stack.Navigator>
        {  user? (
          <Stack.Screen name="Home">
            {props => <Homescreen {...props} extraData={user} />}
          </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registration" component={RegistrationScreen} />
            </>
          )}
      </Stack.Navigator> */

