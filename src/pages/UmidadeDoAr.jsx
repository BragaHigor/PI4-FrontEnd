/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import * as theme from '../styles/theme';
import {Block, Text} from '../components';
import mocks from '../interface/settings';
import Dados from '../components/Estatistica';

import InteractiveChart from '../components/graficos/InteractiveChart';

export default function UmidadeDoAr() {
  return (
    <ScrollView
      contentContainerStyle={styles.dashboard}
      stickyHeaderIndices={[0]}>
      <Block column>
        <Text name>{mocks.ar.name}</Text>
        <Text welcome>Das últimas 7 dias</Text>
        <InteractiveChart />
      </Block>
      <Block flex column space="around">
        <Dados title="Média" value={300} title2="Modal/Mediana" value2={100} />
        <Dados
          title="Desvio Padrão"
          value={1.8}
          title2="Assimetria"
          value2={25}
        />
        <Dados title="Curtose" value={70} title2="Probabilidade" value2={80} />
        <Dados
          title="Regressão"
          value={15}
          title2="Inferência estatística"
          value2={80}
        />
      </Block>
    </ScrollView>
  );
}

UmidadeDoAr.defaultProps = {
  settings: mocks,
};

const styles = StyleSheet.create({
  dashboard: {
    padding: theme.sizes.base * 2,
  },
});
