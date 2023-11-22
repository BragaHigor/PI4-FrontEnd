/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
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
import IconUser from '../assets/img/user-30.png';
import IconClose from '../assets/img/sair.png';
import Close from '../assets/img/X.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import http from '../db/http';
export default function Dashboard(props) {
  const {navigation} = props;

  const [isModalVisible, setModalVisible] = useState(false);
  const [dataUsers, setDataUsers] = useState(false);
  const [dataEqp, setDataEqp] = useState(false);
  const [nomeCliente, setNomeCliente] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [infos, setInfos] = useState();
  const [temperature, setTemperature] = useState();
  const [airMoisture, setAirMoisture] = useState();
  const [soilMoisture, setSoilMoisture] = useState();

  const [arrayTemp, setArrayTemp] = useState();
  const [arrayAir, setArrayAir] = useState();
  const [arraySoil, setArraySoil] = useState();

  const [email, setEmail] = useState('');
  const [address, setAddress] = useState({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    cep: '',
  });

  const [saveButton, setSaveButton] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem('token_API');

        if (token) {
          const response = await http.get('/users');

          const data = response.data;
          setNomeCliente(data[0].name);

          setDataUsers(true);
        }
      } catch (error) {
        console.error('Erro ao obter os dados do cliente:', error);
        console.error(
          'Erro ao obter os dados do cliente:',
          error.response ? error.response.data : error.message,
        );
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const token = await AsyncStorage.getItem('token_API');

        if (token && dataUsers) {
          const serial = await http.get('/equipments');
          const serialData = serial.data;
          setSerialNumber(serialData[0].serialNumber);
          setDataEqp(true);
        }
      } catch (error) {
        console.error('Erro ao obter os dados do equipment:', error);
        console.error(
          'Erro ao obter os dados do equipment:',
          error.response ? error.response.data : error.message,
        );
      }
    };

    fetchEquipments();
  }, [dataUsers]);

  useEffect(() => {
    const fetchInfos = async () => {
      try {
        const token = await AsyncStorage.getItem('token_API');

        if (token && dataEqp) {
          const response = await http.get('/infos', {
            params: {
              equipmentSerialNumber: serialNumber,
              filter: 'hours',
            },
          });

          const data = response.data;
          setInfos(data);
          setAirMoisture(data[0].airMoisture);
          setTemperature(data[0].temperature);
          setSoilMoisture(data[0].soilMoisture);
        }
      } catch (error) {
        console.error('Erro ao obter os dados de infos:', error);
        console.error(
          'Erro ao obter os dados de infos:',
          error.response ? error.response.data : error.message,
        );
      }
    };

    fetchInfos();
  }, [dataEqp, serialNumber]);

  useEffect(() => {
    const tempArray = [];
    const airArray = [];
    const soilArray = [];

    if (infos) {
      const lastFiveEntries = infos.slice(-5);
      lastFiveEntries.forEach(entry => {
        tempArray.push(entry.temperature);
        airArray.push(entry.airMoisture);
        soilArray.push(entry.soilMoisture);
      });
    }

    setArrayTemp(tempArray);
    setArrayAir(airArray);
    setArraySoil(soilArray);
  }, [infos]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token_API');
      navigation.replace('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const handleInputChange = (fieldName, value) => {
    setAddress({ ...address, [fieldName]: value });
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function EditInfo({ save }) {

    useEffect(() => {
      const fetchPutUser = async () => {
        try {
          const response = await http.put('/users', {
            user: { email: email, address: address },
          });

          console.log('Dados atualizados com sucesso', response.data);
          closeModal();
        } catch (error) {
          console.error('Erro ao atualizar dados', error);
        }
        setSaveButton(false);
      };
      if (save) {
        fetchPutUser();
      }
    }, [save]);

    return (
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={closeModal}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
            <Field
              placeholder="Email"
              value={email}
              onChange={(text) => setEmail(text)}
            />
            <Field
              placeholder="Rua"
              value={address.street}
              onChangeText={(text) => handleInputChange('street', text)}
            />
            <Field
              placeholder="Numero"
              value={address.number}
              onChangeText={(text) => handleInputChange('number', text)}
            />
            <Field
              placeholder="Bairro"
              value={address.neighborhood}
              onChangeText={(text) => handleInputChange('neighborhood', text)}
            />
            <Field
              placeholder="Cidade"
              value={address.city}
              onChangeText={(text) => handleInputChange('city', text)}
            />
            <Field
              placeholder="Estado"
              value={address.state}
              onChangeText={(text) => handleInputChange('state', text)}
            />
            <Field
              placeholder="CEP"
              value={address.cep}
              onChangeText={(text) => handleInputChange('cep', text)}
            />
            <Button
              title="Salvar"
              onPress={() => setSaveButton(true)}
              color={theme.colors.accent}
            />
          </View>
        </View>
      </Modal>
    );
  }
  return (
    <>
      <EditInfo save={saveButton}/>
      <ScrollView contentContainerStyle={styles.dashboard}>
        <Block>
          <Block row space="around">
            <Block>
              <Text welcome>Bem-Vindo</Text>
              <Text name>{nomeCliente}</Text>
            </Block>
            <View style={styles.statistics}>
              <TouchableOpacity activeOpacity={0.8} onPress={openModal}>
                <Image source={IconUser} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={handleLogout}>
                <Image source={IconClose} />
              </TouchableOpacity>
            </View>
          </Block>
        </Block>

        <Dash
          value={airMoisture}
          unidade={'%'}
          arrayDados={arrayAir}
          mock={mocks.ar.name}
          navigation={navigation}
          screenName="UmidadeDoAr"
          params={{name: 'ar'}}
        />

        <Dash
          value={soilMoisture}
          unidade={'%'}
          arrayDados={arraySoil}
          mock={mocks.solo.name}
          navigation={navigation}
          screenName="UmidadeDoSolo"
          params={{name: 'solo'}}
        />

        <Dash
          value={temperature}
          unidade={'°C'}
          arrayDados={arrayTemp}
          mock={mocks.temperatura.name}
          navigation={navigation}
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
  statistics: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 20,
  },
});
