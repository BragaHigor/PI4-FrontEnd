import React from 'react';
import {StyleSheet} from 'react-native';
import {Block, Text} from '../components';

export default function Probabilidade({title, value, title2, value2}) {
  return (
    <Block row space="around">
      <Block center middle style={styles.statistics}>
        <Text welcome>{title}</Text>
        <Text name>{value}</Text>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  statistics: {
    width: 135,
    height: 135,
  },
});
