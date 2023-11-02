/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet} from 'react-native';
import * as theme from '../styles/theme';
import {Block, Text} from '../components';

export default function Settings(props) {
  const {navigation} = props;
  const name = navigation.getParam('name');

  return (
    <Block flex={1}>
      <Text>Settings for {name}</Text>
    </Block>
  );
}

const styles = StyleSheet.create({});
