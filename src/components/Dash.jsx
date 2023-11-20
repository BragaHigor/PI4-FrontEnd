// Dash.js
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import * as theme from '../styles/theme';
import {Block, Text} from '../components';
import {LineChart} from 'react-native-svg-charts';
import mocks from '../interface/settings';
import * as shape from 'd3-shape';

export default function Dash({
  value,
  unidade,
  arrayDados,
  mock,
  navigation,
  screenName,
  params,
}) {
  const navigateToScreen = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate(screenName, params);
    } else {
      console.warn(
        'Propriedade "navigation" ausente ou método "navigate" não disponível.',
      );
    }
  };

  return (
    <>
      <TouchableOpacity activeOpacity={0.8} onPress={navigateToScreen}>
        <Block row style={{paddingVertical: 35}}>
          <Block flex={1.5} row style={{alignItems: 'flex-end'}}>
            <Text h1>{value}</Text>
            <Text h1 size={34} height={80} weight={'600'} spacing={0.1}>
              {unidade}
            </Text>
          </Block>

          <Block flex column style={{paddingHorizontal: theme.sizes.base}}>
            <Text caption>{mock}</Text>
            <LineChart
              style={{flex: 1}}
              curve={shape.curveNatural}
              data={arrayDados}
              svg={{stroke: theme.colors.accent}}
            />
          </Block>
        </Block>
      </TouchableOpacity>
    </>
  );
}

Dash.defaultProps = {
  settings: mocks,
};
