import React, {useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import * as theme from '../styles/theme';
import {Block, Text} from '../components';
import mocks from '../interface/settings';
import Dados from '../components/Estatistica';

import InteractiveChart from '../components/graficos/InteractiveChart';

export default function Temperatura() {
  const [selectedOption, setSelectedOption] = useState('Dias');
  const [dados, setDados] = useState({
    Dias: {
      x: ['08-10', '08-11', '08-12', '08-13', '08-14'],
      y: [75, 40, 25, 90, 15],
    },
    Horas: {
      x: ['08-10', '08-11', '08-12', '08-13', '08-14'],
      y: [10, 14, 40, 10, 55],
    },
  });

  const dateList = dados[selectedOption].x;
  const priceList = dados[selectedOption].y;

  function handleOptionChange(option) {
    setSelectedOption(option);
  }

  function selectDia() {
    return (
      <>
        <Block row space="around">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleOptionChange('Dias')}>
            <Text name>Dias</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleOptionChange('Horas')}>
            <Text welcome>Horas</Text>
          </TouchableOpacity>
        </Block>
      </>
    );
  }

  function selectHora() {
    return (
      <>
        <Block row space="around">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleOptionChange('Dias')}>
            <Text welcome>Dias</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleOptionChange('Horas')}>
            <Text name>Horas</Text>
          </TouchableOpacity>
        </Block>
      </>
    );
  }

  function Dias() {
    return (
      <ScrollView
        contentContainerStyle={styles.dashboard}
        stickyHeaderIndices={[0]}>
        <Block>
          <Block row space="around">
            <Block style={styles.titulo}>
              <Text name>{mocks.temperatura.name}</Text>
              <Text welcome>Dos últimos 7 dias</Text>
            </Block>
            {selectDia()}
          </Block>
          <InteractiveChart xValue={dateList} yValue={priceList} />
        </Block>

        <Block flex column space="around">
          <Dados
            title="Média"
            value={300}
            title2="Modal/Mediana"
            value2={100}
          />
          <Dados
            title="Desvio Padrão"
            value={1.8}
            title2="Assimetria"
            value2={25}
          />
          <Dados
            title="Curtose"
            value={70}
            title2="Probabilidade"
            value2={80}
          />
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

  function Horas() {
    return (
      <ScrollView
        contentContainerStyle={styles.dashboard}
        stickyHeaderIndices={[0]}>
        <Block>
          <Block row space="around">
            <Block style={styles.titulo}>
              <Text name>{mocks.temperatura.name}</Text>
              <Text welcome>Das últimas 7 horas</Text>
            </Block>
            {selectHora()}
          </Block>
          <InteractiveChart xValue={dateList} yValue={priceList} />
        </Block>
        <Block flex column space="around">
          <Dados
            title="Média"
            value={2000}
            title2="Modal/Mediana"
            value2={50000}
          />
          <Dados
            title="Desvio Padrão"
            value={1.8}
            title2="Assimetria"
            value2={25}
          />
          <Dados
            title="Curtose"
            value={70}
            title2="Probabilidade"
            value2={80}
          />
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
  return selectedOption === 'Dias' ? Dias() : Horas();
}

Temperatura.defaultProps = {
  settings: mocks,
};

const styles = StyleSheet.create({
  dashboard: {
    padding: theme.sizes.base * 2,
  },
  titulo: {
    height: 65,
  },
});
