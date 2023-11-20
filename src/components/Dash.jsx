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
  rota,
  screenName,
  params,
}) {
  if (!Array.isArray(arrayDados) || arrayDados.length === 0) {
    // Se o arrayDados não estiver pronto, pode retornar algo indicando que os dados estão sendo carregados
    return <Text>Carregando dados...</Text>; // ou qualquer outro indicador visual
  }
  // console.log('Renderizando Dash com os seguintes dados:');
  // console.log('Value:', value);
  // console.log('Unidade:', unidade);
  // console.log('Array de Dados:', arrayDados);
  // console.log('Mock:', mock);
  // console.log('Rota:', rota);
  // console.log('Nome da Tela:', screenName);
  // console.log('Parâmetros:', params);
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => rota.navigate(screenName, params)}>
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
