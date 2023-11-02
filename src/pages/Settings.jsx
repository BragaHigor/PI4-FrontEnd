/* eslint-disable no-unused-vars */
import React from 'react';
import {StyleSheet} from 'react-native';
import {Block, Text} from '../components';

export default function Settings({route}) {
  const {name} = route.params;

  return (
    <Block flex={1}>
      <Text>Settings for {name}</Text>
    </Block>
  );
}

const styles = StyleSheet.create({});
