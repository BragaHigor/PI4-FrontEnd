/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import * as theme from '../styles/theme';
import {Block, Text} from '../components';

export default function Dashboard(props) {
  const {navigation} = props;

  return (
    <ScrollView contentContainerStyle={styles.dashboard}>
      <Block column>
        <Text welcome>Welcome</Text>
        <Text name>Higor Braga</Text>
      </Block>

      <Block row style={{paddingVertical: 10}}>
        <Block flex={1.2} row style={{alignItems: 'flex-end'}}>
          <Text h1>34</Text>
          <Text h1 size={34} height={80} weight={'600'} spacing={0.1}>
            °C
          </Text>
        </Block>

        <Block flex column>
          <Text caption>Humidity</Text>
          <Text>Chart</Text>
        </Block>
      </Block>

      <Block flex column space="around">
        <Block row space="around">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Settings', {name: 'light'})}>
            <Block center middle style={styles.button}>
              <Text button>Light</Text>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Settings', {name: 'ac'})}>
            <Block center middle style={styles.button}>
              <Text button>AC</Text>
            </Block>
          </TouchableOpacity>
        </Block>

        <Block row space="around">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Settings', {name: 'temperatura'})
            }>
            <Block center middle style={styles.button}>
              <Text button>Temperatura</Text>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Settings', {name: 'fan'})}>
            <Block center middle style={styles.button}>
              <Text button>Fan</Text>
            </Block>
          </TouchableOpacity>
        </Block>

        <Block row space="around">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Settings', {name: 'wi-fi'})}>
            <Block center middle style={styles.button}>
              <Text button>Wi-fi</Text>
            </Block>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('Settings', {name: 'electricity'})
            }>
            <Block center middle style={styles.button}>
              <Text button>Electricity</Text>
            </Block>
          </TouchableOpacity>
        </Block>
      </Block>
    </ScrollView>
  );
}

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
