/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import * as theme from '../styles/theme';
import {Block, Text} from '../components';
import {LineChart} from 'react-native-svg-charts';
import mocks from '../interface/settings';
import * as shape from 'd3-shape';
export default function Dashboard(props) {
  const {navigation} = props;

  const array1 = Array.from({length: 6}, () => Math.floor(Math.random() * 101));
  const array2 = Array.from({length: 6}, () => Math.floor(Math.random() * 101));
  const array3 = Array.from({length: 6}, () => Math.floor(Math.random() * 101));

  return (
    <ScrollView contentContainerStyle={styles.dashboard}>
      <Block column>
        <Text welcome>Bem-Vindo</Text>
        <Text name>Higor Braga</Text>
      </Block>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('UmidadeDoAr', {
            name: 'ar',
          })
        }>
        <Block row style={{paddingVertical: 35}}>
          <Block flex={1.5} row style={{alignItems: 'flex-end'}}>
            <Text h1>34</Text>
            <Text h1 size={34} height={80} weight={'600'} spacing={0.1}>
              %
            </Text>
          </Block>

          <Block flex column style={{paddingHorizontal: theme.sizes.base}}>
            <Text caption>{mocks.ar.name}</Text>
            <LineChart
              style={{flex: 1}}
              curve={shape.curveNatural}
              data={array1}
              svg={{stroke: theme.colors.accent}}></LineChart>
          </Block>
        </Block>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('UmidadeDoSolo', {
            name: 'solo',
          })
        }>
        <Block row style={{paddingVertical: 30}}>
          <Block flex={1.5} row style={{alignItems: 'flex-end'}}>
            <Text h1>25</Text>
            <Text h1 size={34} height={80} weight={'600'} spacing={0.1}>
              %
            </Text>
          </Block>

          <Block flex column style={{paddingHorizontal: theme.sizes.base}}>
            <Text caption>{mocks.solo.name}</Text>
            <LineChart
              style={{flex: 1}}
              curve={shape.curveNatural}
              data={array2}
              svg={{stroke: theme.colors.accent}}></LineChart>
          </Block>
        </Block>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('Temperatura', {
            name: 'temperatura',
          })
        }>
        <Block row style={{paddingVertical: 30}}>
          <Block flex={1.5} row style={{alignItems: 'flex-end'}}>
            <Text h1>15</Text>
            <Text h1 size={34} height={80} weight={'600'} spacing={0.1}>
              °C
            </Text>
          </Block>

          <Block flex column style={{paddingHorizontal: theme.sizes.base}}>
            <Text caption>{mocks.temperatura.name}</Text>
            <LineChart
              style={{flex: 1}}
              curve={shape.curveNatural}
              data={array3}
              svg={{stroke: theme.colors.accent}}></LineChart>
          </Block>
        </Block>
      </TouchableOpacity>
    </ScrollView>
  );
}

Dashboard.defaultProps = {
  settings: mocks,
};

const styles = StyleSheet.create({
  dashboard: {
    padding: theme.sizes.base * 2,
  },
  button: {
    backgroundColor: theme.colors.button,
    width: 151,
    height: 151,
    borderRadius: 151 / 2,
  },
});
