/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import * as theme from '../styles/theme';
import {Block, Text} from '../components';
import {LineChart, Path} from 'react-native-svg-charts';
import mocks from '../interface/settings';
import * as shape from 'd3-shape';
export default function Dashboard(props) {
  const {navigation, settings} = props;

  // const LightIcon = settings.light.icon;
  // const ACIcon = settings.ac.icon;
  // const TempIcon = settings.temperature.icon;
  // const FanIcon = settings.fan.icon;
  // const WiFiIcon = settings['wi-fi'].icon;
  // const ElectricityIcon = settings.electricity.icon;

  return (
    <ScrollView contentContainerStyle={styles.dashboard}>
      <Block column>
        <Text welcome>Bem-Vindo</Text>
        <Text name>Higor Braga</Text>
      </Block>

      <Block row style={{paddingVertical: 25}}>
        <Block flex={1.5} row style={{alignItems: 'flex-end'}}>
          <Text h1>34</Text>
          <Text h1 size={34} height={80} weight={'600'} spacing={0.1}>
            °C
          </Text>
        </Block>

        <Block flex column style={{paddingHorizontal: theme.sizes.base}}>
          <Text caption>Umidade do ar</Text>
          <LineChart
            style={{flex: 1}}
            curve={shape.curveNatural}
            data={[0, 20, 25, 15, 20, 55, 60]}
            svg={{stroke: theme.colors.accent}}></LineChart>
        </Block>
      </Block>

      <Block flex column space="around">
        <Block row space="around">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Settings', {
                name: 'light',
              })
            }>
            <Block center middle style={styles.button}>
              {/* <LightIcon size={38} /> */}
              <Text button>{mocks.light.name}</Text>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Settings', {
                name: 'ac',
              })
            }>
            <Block center middle style={styles.button}>
              {/* <ACIcon size={38} /> */}
              <Text button>{mocks.ac.name}</Text>
            </Block>
          </TouchableOpacity>
        </Block>

        <Block row space="around">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Settings', {
                name: 'temperatura',
              })
            }>
            <Block center middle style={styles.button}>
              {/* <TempIcon size={38} /> */}
              <Text button>{mocks.temperature.name}</Text>
            </Block>
          </TouchableOpacity>

          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Settings', {
                name: 'fan',
              })
            }>
            <Block center middle style={styles.button}> */}
          {/* <FanIcon size={38} /> */}
          {/* <Text button>{mocks.fan.name}</Text>
            </Block>
          </TouchableOpacity>
        </Block>

        <Block row space="around">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Settings', {
                name: 'wi-fi',
              })
            }>
            <Block center middle style={styles.button}> */}
          {/* <WiFiIcon size={38} /> */}
          {/* <Text button>{mocks['wi-fi'].name}</Text>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Settings', {
                name: 'electricity',
              })
            }>
            <Block center middle style={styles.button}> */}
          {/* <ElectricityIcon size={38} /> */}
          {/* <Text button>{mocks.electricity.name}</Text>
            </Block>
          </TouchableOpacity> */}
        </Block>
      </Block>
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
