// App.js
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
import PrivateRoute from './AppPrivateRouter';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard">
          {({navigation}) => (
            <PrivateRoute navigation={navigation}>
              <Dashboard navigation={navigation} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name="UmidadeDoAr">
          {({navigation}) => (
            <PrivateRoute navigation={navigation}>
              <UmidadeDoAr navigation={navigation} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name="UmidadeDoSolo">
          {({navigation}) => (
            <PrivateRoute navigation={navigation}>
              <UmidadeDoSolo navigation={navigation} />
            </PrivateRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name="Temperatura">
          {({navigation}) => (
            <PrivateRoute navigation={navigation}>
              <Temperatura navigation={navigation} />
            </PrivateRoute>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
