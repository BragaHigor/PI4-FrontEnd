/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native';
import {darkGreen} from '../styles/Constants';

export default function Field(props) {
  return (
    <TextInput
      {...props}
      style={{
        borderRadius: 100,
        color: darkGreen,
        paddingHorizontal: 10,
        width: '78%',
        backgroundColor: 'rgb(220,220,220)',
        marginVertical: 10
      }}
      placeholderTextColor={darkGreen}></TextInput>
  );
}
