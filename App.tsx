import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/pages/Home';
import Register from './src/pages/Register';
import Login from './src/pages/Login';
import Dashboard from './src/pages/Dashboard';
import UmidadeDoAr from './src/pages/UmidadeDoAr';
import UmidadeDoSolo from './src/pages/UmidadeDoSolo';
import Temperatura from './src/pages/Temperatura';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="UmidadeDoAr" component={UmidadeDoAr} />
        <Stack.Screen name="UmidadeDoSolo" component={UmidadeDoSolo} />
        <Stack.Screen name="Temperatura" component={Temperatura} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
