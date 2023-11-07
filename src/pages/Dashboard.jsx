/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Button,
  Modal,
} from 'react-native';
import Field from '../components/Field';
import * as theme from '../styles/theme';
import {Block, Text} from '../components';
import mocks from '../interface/settings';
import Dash from '../components/Dash';
import Icon from '../assets/img/user-30.png';
import Close from '../assets/img/X.png';
export default function Dashboard(props) {
  const {navigation} = props;

  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  function EditInfo() {
    return (
      <>
        <Modal
          transparent={true}
          visible={isModalVisible}
          animationType="slide"
          onRequestClose={closeModal}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 30,
                width: 300,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text name>Editar Informações</Text>
                <TouchableOpacity onPress={closeModal}>
                  <Image source={Close} style={{width: 24, height: 24}} />
                </TouchableOpacity>
              </View>

              <Field placeholder="Nome" />
              <Field placeholder="E-mail" />
              <Field placeholder="Senha" />
              <Field placeholder="Telefone" />
              <Button
                title="Salvar"
                onPress={closeModal}
                color={theme.colors.accent}
              />
            </View>
          </View>
        </Modal>
      </>
    );
  }

  const array1 = Array.from({length: 11}, () => Math.floor(Math.random() * 90));
  const array2 = Array.from({length: 11}, () => Math.floor(Math.random() * 90));
  const array3 = Array.from({length: 11}, () => Math.floor(Math.random() * 90));

  return (
    <>
      {EditInfo()}
      <ScrollView contentContainerStyle={styles.dashboard}>
        <Block>
          <Block row space="around">
            <Block>
              <Text welcome>Bem-Vindo</Text>
              <Text name>Higor Braga</Text>
            </Block>
            <TouchableOpacity activeOpacity={0.8} onPress={openModal}>
              <Image source={Icon} />
            </TouchableOpacity>
          </Block>
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
    </>
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
