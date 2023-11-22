/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Background from '../components/Background';
import {darkGreen} from '../styles/Constants';
import Field from '../components/Field';
import Btn from '../components/Btn';
import http from '../db/http';

export default function Register(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [serial, setSerial] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const limparInput = () => {
    setConfirmPassword('');
    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setSerial('');
  };

  const handleSignup = async () => {
    if (
      !firstName ||
      !lastName ||
      !serial ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert('Preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas precisam ser iguais');
      return;
    }

    try {
      const newUser = {
        name: `${firstName}`,
        email,
        password,
        serialNumber: serial,
      };

      const response = await http.post('/users', newUser);

      console.log('DADOS USUARIO', response);

      if (response.status === 201) {
        alert('Account created');
        limparInput();
        props.navigation.navigate('Login');
      } else {
        alert('Error: ' + response.data.message);
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Ocorreu um erro ao criar a conta. Tente novamente mais tarde.');
    }
  };

  return (
    <Background>
      <View style={{alignItems: 'center', width: '100%'}}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Register
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Create a new account
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 400,
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center',
          }}>
          <Field
            placeholder="First Name"
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
          <Field
            placeholder="Last Name"
            value={lastName}
            onChangeText={text => setLastName(text)}
          />
          <Field
            placeholder="Serial"
            value={serial}
            onChangeText={text => setSerial(text)}
          />
          <Field
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <Field
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
          <Field
            placeholder="Confirm Password"
            value={confirmPassword}
            secureTextEntry={true}
            onChangeText={text => setConfirmPassword(text)}
          />
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Signup"
            Press={() => {
              handleSignup();
            }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
}
