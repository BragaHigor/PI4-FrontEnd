import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import * as theme from '../styles/theme';
import {Block, Text} from '../components';
import mocks from '../interface/settings';
import Dash from '../components/Dash';
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

      <Dash
        value={34}
        unidade={'%'}
        arrayDados={array1}
        mock={mocks.ar.name}
        rota={navigation}
        screenName="UmidadeDoAr"
        params={{name: 'ar'}}
      />

      <Dash
        value={25}
        unidade={'%'}
        arrayDados={array2}
        mock={mocks.solo.name}
        rota={navigation}
        screenName="UmidadeDoSolo"
        params={{name: 'solo'}}
      />

      <Dash
        value={15}
        unidade={'°C'}
        arrayDados={array3}
        mock={mocks.temperatura.name}
        rota={navigation}
        screenName="Temperatura"
        params={{name: 'temperatura'}}
      />
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
});
