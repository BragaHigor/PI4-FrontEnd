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
        // serialNumber: serial,
      };

      const response = await http.post('/users', newUser);

      console.log('DADOS USUARIO', response);

      if (response.status === 201) {
        // Usuário foi criado com sucesso
        alert('Conta criada com sucesso');
        limparInput();
        props.navigation.navigate('Login');
      } else {
        // Lidar com erros aqui, por exemplo, usuário já existe, problemas de validação, etc.
        alert('Error: ' + response.data.message); // Exibir a mensagem de erro do servidor
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
          Cadastro
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Crei a sua conta
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
            placeholder="Nome"
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
          <Field
            placeholder="Sobrenome"
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
            placeholder="Senha"
            value={password}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
          <Field
            placeholder="Confirme sua Senha"
            value={confirmPassword}
            secureTextEntry={true}
            onChangeText={text => setConfirmPassword(text)}
          />
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Cadastrar"
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
              Já possuí uma conta ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Login')}>
              <Text
                style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
                Entrar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Background>
  );
}
