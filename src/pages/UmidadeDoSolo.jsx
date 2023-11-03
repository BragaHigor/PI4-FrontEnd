import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import * as theme from '../styles/theme';
import {Block, Text} from '../components';
// import {LineChart} from 'react-native-svg-charts';
import mocks from '../interface/settings';

import InteractiveChart from '../components/graficos/InteractiveChart';

export default function UmidadeDoSolo() {
  return (
    <ScrollView
      contentContainerStyle={styles.dashboard}
      stickyHeaderIndices={[0]}>
      <Block column style={styles.header}>
        <Text name>{mocks.solo.name}</Text>
        <InteractiveChart />
      </Block>
      <Block flex column space="around">
        <Block row space="around">
          <Block center middle style={styles.statistics}>
            <Text welcome>Média</Text>
            <Text name>300</Text>
          </Block>

          <Block center middle style={styles.statistics}>
            <Text welcome>Modal/Mediana</Text>
            <Text name>100</Text>
          </Block>
        </Block>

        <Block row space="around">
          <Block center middle style={styles.statistics}>
            <Text welcome>Desvio Padrão</Text>
            <Text name>1.80</Text>
          </Block>

          <Block center middle style={styles.statistics}>
            <Text welcome>Assimetria</Text>
            <Text name>25</Text>
          </Block>
        </Block>

        <Block row space="around">
          <Block center middle style={styles.statistics}>
            <Text welcome>Curtose</Text>
            <Text name>70</Text>
          </Block>

          <Block center middle style={styles.statistics}>
            <Text welcome>Probabilidades</Text>
            <Text name>80</Text>
          </Block>
        </Block>

        <Block row space="around">
          <Block center middle style={styles.statistics}>
            <Text welcome>Regressão</Text>
            <Text name>15</Text>
          </Block>

          <Block center middle style={styles.statistics}>
            <Text welcome>Inferência estatística</Text>
            <Text name>80</Text>
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
}

UmidadeDoSolo.defaultProps = {
  settings: mocks,
};

const styles = StyleSheet.create({
  dashboard: {
    padding: theme.sizes.base * 2,
  },
  statistics: {
    width: 151,
    height: 151,
  },
});
