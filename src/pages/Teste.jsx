/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import Background from '../components/Background';
import Btn from '../components/Btn';
import {darkGreen, green} from '../styles/Constants';

export default function Teste(props) {
  return (
    <Background>
      <View style={{marginHorizontal: 40, marginVertical: 100}}>
        <Text style={{color: 'white', fontSize: 50}}>Seja Bem-Vindo a</Text>
        <Text style={{color: 'white', fontSize: 60, marginBottom: 40}}>
          Solo Smart
        </Text>
        <Btn
          bgColor={green}
          textColor="white"
          btnLabel="Login"
          Press={() => props.navigation.navigate('Login')}
        />
      </View>
    </Background>
  );
}
