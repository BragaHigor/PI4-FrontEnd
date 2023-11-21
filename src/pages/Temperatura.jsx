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

export default function Temperatura() {
  const [selectedOption, setSelectedOption] = useState('Dias');
  // eqp
  const [dataEqp, setDataEqp] = useState(false);
  const [serialNumber, setSerialNumber] = useState('');
  // infos
  const [infos, setInfos] = useState([]);
  // hours
  const [perHour, setPerHour] = useState([]);
  // days
  const [arrayDias, setArrayDias] = useState([]);
  // statistic
  const [mean, setMean] = useState(''); 
  const [mode, setMode] = useState(''); 
  const [median, setMedian] = useState(''); 
  const [standardDeviation, setStandardDeviation] = useState(''); 
  const [skewness, setSkewness] = useState(''); 
  const [kurtosis, setKurtosis] = useState('');
  const [hydrationProbabilityDay, setHydrationProbability] = useState('');

  const [meanHour, setMeanHour] = useState(''); 
  const [modeHour, setModeHour] = useState(''); 
  const [medianHour, setMedianHour] = useState(''); 
  const [standardDeviationHour, setStandardDeviationHour] = useState(''); 
  const [skewnessHour, setSkewnessHour] = useState(''); 
  const [kurtosisHour, setKurtosisHour] = useState('');
  const [hydrationProbabilityHour, setHydrationProbabilityHour] = useState('');

  // dados grafico
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
              infosType: 'temperature'
            }
          });

          const data = response.data;
          setInfos(data);
          // console.log("dias",data);
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
    const fetchInfosHours = async () => {
      try {
        const token = await AsyncStorage.getItem('token_API');
        // console.log('Dash Token:', token);

        if (token && dataEqp) {
          const response = await http.get('/infos', {
            params: {
              equipmentSerialNumber: serialNumber,
              filter: 'hours',
              infosType: 'temperature'
            }
          });

          const data = response.data;
          // console.log("horas", data)
          setPerHour(data);
          
        }
        
        
      } catch (error) {
        console.error('Erro ao obter os dados de infos:', error);
        console.error(
          'Erro ao obter os dados de infos:',
          error.response ? error.response.data : error.message,
        );
      }
    };

    fetchInfosHours();
  }, [dataEqp]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const token = await AsyncStorage.getItem('token_API');
        // console.log('Dash Token:', token);

        if (token) {
          // console.log(infos);
          const datesSet = new Set(infos.map(item => item.date));
          const datesArray = Array.from(datesSet);
          const datesRequestBody = { "dates": datesArray };
          // console.log(datesRequestBody)
          const response = await http.post('/infos/statistic', datesRequestBody,  {
            params: {
              equipmentSerialNumber: serialNumber,
              filter: 'day',
            }
          });
          const statistics = response.data;
          setArrayDias(statistics);
          console.log(statistics);
          setMean(statistics[0][5].temperature.mean.toFixed(1));
          setMode(statistics[0][5].temperature.mode);
          setMedian(statistics[0][5].temperature.median.toFixed(1));
          setStandardDeviation(statistics[0][5].temperature.standardDeviation.toFixed(1));
          setKurtosis(statistics[0][5].temperature.kurtosis.toFixed(1));
          setSkewness(statistics[0][5].temperature.skewness.toFixed(1));
          setHydrationProbability(statistics[0][5].hydrationProbability);
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
  }, []);

  useEffect(() => {
    const fetchStatisticsHours = async () => {
      try {
        const token = await AsyncStorage.getItem('token_API');
        // console.log('Dash Token:', token);

        if (token && dataEqp) {
          const response = await http.post('/infos/statistic', null,  {
            params: {
              equipmentSerialNumber: serialNumber,
              filter: 'hours',
            }
          });
          const statistics = response.data;
          // console.log(statistics)
          setMeanHour(statistics[0].temperature.mean.toFixed(1));
          setModeHour(statistics[0].temperature.mode);
          setMedianHour(statistics[0].temperature.median.toFixed(1));
          setStandardDeviationHour(statistics[0].temperature.standardDeviation.toFixed(1));
          setKurtosisHour(statistics[0].temperature.kurtosis.toFixed(1));
          setSkewnessHour(statistics[0].temperature.skewness.toFixed(1));
          setHydrationProbabilityHour(statistics[0].hydrationProbability);
        }
      } catch (error) {
        console.error('Erro ao obter os dados de estatistica:', error);
        console.error(
          'Erro ao obter os dados de estatistica:',
          error.response ? error.response.data : error.message,
        );
      }
    };

    fetchStatisticsHours();
  }, [dataEqp]);

  useEffect(() => {

    if (infos){
      const newData = {
        Dias: {
          x: perHour.map(entry => moment(entry.date, "DD/MM/YYYY").format("DD-MM")), // Substitua 'date' pelo campo da data na sua API
          y: perHour.map(entry => entry.temperature), // Substitua 'temperature' pelo campo de temperatura na sua API
        },
        Horas: {
          x: perHour.map(entry => moment(entry.time, "HH:mm:ss").format("HH")), // Substitua 'date' pelo campo da data na sua API
          y: perHour.map(entry => entry.temperature), // Substitua 'temperature' pelo campo de temperatura na sua API
        },
      };
      setDados(newData);
    }
    
  }, [infos]);

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
              <Text name>{mocks.temperatura.name}</Text>
              <Text welcome>Dos últimos 5 dias</Text>
            </Block>
            {selectDia()}
          </Block>
          <InteractiveChart xValue={dateList} yValue={value} />
        </Block>

        <Block flex column space="around">
        <Dados
            title="Média"
            value={10}
            title2="Moda"
            value2={mode}
          />
          <Dados
            title="Mediana"
            value={median}
            title2="Desvio Padrão"
            value2={standardDeviation}
          />
          <Dados
            title="Assimetria"
            value={skewness}
            title2="Curtose"
            value2={kurtosis}
          />
          <Dados
            title="Probabilidade planta desidratada"
            value={hydrationProbabilityDay}
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
              <Text welcome>Das últimas 5 horas</Text>
            </Block>
            {selectHora()}
          </Block>
          <InteractiveChart xValue={dateList} yValue={value} />
        </Block>
        <Block flex column space="around">
        <Dados
            title="Média"
            value={meanHour}
            title2="Moda"
            value2={modeHour}
          />
          <Dados
            title="Mediana"
            value={medianHour}
            title2="Desvio Padrão"
            value2={standardDeviationHour}
          />
          <Dados
            title="Assimetria"
            value={skewnessHour}
            title2="Curtose"
            value2={kurtosisHour}
          />
          <Dados
            title="Probabilidade planta desidratada"
            value={hydrationProbabilityHour}
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
