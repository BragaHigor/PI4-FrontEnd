import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import * as theme from '../styles/theme';
import {Block, Text} from '../components';
import mocks from '../interface/settings';
import Dados from '../components/Estatistica';
import AsyncStorage from '@react-native-async-storage/async-storage';
import http from '../db/http';
import moment from 'moment';

import InteractiveChart from '../components/graficos/InteractiveChart';

export default function UmidadeDoSolo() {
  const [selectedOption, setSelectedOption] = useState('Dias');
  const [dataEqp, setDataEqp] = useState(false);
  const [dataInfos, setDataInfos] = useState(false);
  const [serialNumber, setSerialNumber] = useState('');
  const [infos, setInfos] = useState([]);
  const [perHour, setPerHour] = useState([]);
  const [perDay, setPerDay] = useState([]);
  const [arraySoil, setArraySoil] = useState();
  const [mean, setMean] = useState(''); 
  const [mode, setMode] = useState([]); 
  const [median, setMedian] = useState(''); 
  const [standardDeviation, setStandardDeviation] = useState(''); 
  const [skewness, setSkewness] = useState(''); 
  const [kurtosis, setKurtosis] = useState('');

  const [dados, setDados] = useState({});

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const token = await AsyncStorage.getItem('token_API');
        // console.log('Dash Token:', token);

        if (token) {
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
  }, []);

  useEffect(() => {
    const fetchInfos = async () => {
      try {
        const currentDate = new Date();

        const initDate = currentDate.toLocaleDateString("pt-BR", {
          timeZone: "America/Sao_Paulo",
        });

        const finalDate = new Date(currentDate);
        finalDate.setDate(currentDate.getDate() - 4);

        const lastDate = finalDate.toLocaleDateString("pt-BR", {
          timeZone: "America/Sao_Paulo",
        });

        const token = await AsyncStorage.getItem('token_API');
        // console.log('Dash Token:', token);

        if (token && dataEqp) {
          const response = await http.get('/infos', {
            params: {
              equipmentSerialNumber: serialNumber,
              filter: 'day', // verificar se vai deixar day ou hours aqui
              initDate: lastDate,
              lastDate: initDate,
              infosType: 'soilMoisture'
            }
          });
          // console.log(initDate);
          const data = response.data;
          // console.log(data);
          const lastFiveData = data.slice(0,5);
          setPerHour(lastFiveData);
          // console.log(lastFiveData);
          setInfos(data);
          setDataInfos(true);
          
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
  }, [dataEqp]);

  useEffect(() => {

    if (infos){
      const newData = {
        Dias: {
          x: perHour.map(entry => moment(entry.date, "DD/MM/YYYY").format("DD-MM")), // Substitua 'date' pelo campo da data na sua API
          y: perHour.map(entry => entry.soilMoisture), // Substitua 'soilMoisture' pelo campo de temperatura na sua API
        },
        Horas: {
          x: perHour.map(entry => moment(entry.time, "HH:mm:ss").format("HH")), // Substitua 'date' pelo campo da data na sua API
          y: perHour.map(entry => entry.soilMoisture), // Substitua 'soilMoisture' pelo campo de temperatura na sua API
        },
      };
      setDados(newData);
    }
    
  }, [infos]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const token = await AsyncStorage.getItem('token_API');
        // console.log('Dash Token:', token);

        if (token && perHour) {

          // const requestBody = {
          //   // Adicione os dados que você precisa enviar no corpo da requisição
          //   data: arraySoil
          // };
          
          // console.log(requestBody);
          const response = await http.post('/infos/statistic', null,  {
            params: {
              equipmentSerialNumber: serialNumber,
              filter: 'hours',
              infosType: 'soilMoisture',
            }
          });
          const statistics = response.data;
          console.log(statistics);
          setMean(statistics[0].soilMoisture.mean);
          setMode(statistics[0].soilMoisture.mode);
          setMedian(statistics[0].soilMoisture.median);
          setStandardDeviation(statistics[0].soilMoisture.standardDeviation.toFixed(1));
          setKurtosis(statistics[0].soilMoisture.kurtosis.toFixed(1));
          setSkewness(statistics[0].soilMoisture.skewness.toFixed(1));
        }
      } catch (error) {
        console.error('Erro ao obter os dados de estatistica:', error);
        console.error(
          'Erro ao obter os dados de estatistica:',
          error.response ? error.response.data : error.message,
        );
      }
    };

    fetchStatistics();
  }, [perHour]);

  const dateList = dados[selectedOption]?.x || [];
  const value = dados[selectedOption]?.y || [];

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
              <Text name>{mocks.solo.name}</Text>
              <Text welcome>Dos últimos 5 dias</Text>
            </Block>
            {selectDia()}
          </Block>
          <InteractiveChart xValue={dateList} yValue={value} />
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
              <Text name>{mocks.solo.name}</Text>
              <Text welcome>Das últimas 5 horas</Text>
            </Block>
            {selectHora()}
          </Block>
          <InteractiveChart xValue={dateList} yValue={value} />
        </Block>
        <Block flex column space="around">
          <Dados
            title="Média"
            value={mean}
            title2="Modal/Mediana"
            value2={mode}
          />
          <Dados
            title="Desvio Padrão"
            value={standardDeviation}
            title2="Assimetria"
            value2={skewness}
          />
          <Dados
            title="Curtose"
            value={kurtosis}
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

UmidadeDoSolo.defaultProps = {
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
