/* eslint-disable prettier/prettier */
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
import Probabilidade from '../components/Probabilidade';

export default function UmidadeDoAr() {

  const [selectedOption, setSelectedOption] = useState('Dias');

  const [dataEqp, setDataEqp] = useState(false);
  const [serialNumber, setSerialNumber] = useState('');

  const [infos, setInfos] = useState([]);

  const [perHour, setPerHour] = useState([]);

  const [arrayDias, setArrayDias] = useState([]);

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


  const [datesRequestBody, setDatesRequestBody] = useState([]);

  const [dados, setDados] = useState({});

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const token = await AsyncStorage.getItem('token_API');

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

        const initDate = currentDate.toLocaleDateString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
        });

        const finalDate = new Date(currentDate);
        finalDate.setDate(currentDate.getDate() - 4);

        const lastDate = finalDate.toLocaleDateString('pt-BR', {
          timeZone: 'America/Sao_Paulo',
        });

        const token = await AsyncStorage.getItem('token_API');

        if (token && dataEqp) {
          const response = await http.get('/infos', {
            params: {
              equipmentSerialNumber: serialNumber,
              filter: 'day',
              initDate: lastDate,
              lastDate: initDate,
              infosType: 'airMoisture',
            },
          });

          const data = response.data;
          setInfos(data);
          const datesSet = new Set(data.map(item => item.date));
          const datesArray = Array.from(datesSet);
          setDatesRequestBody(prevDates => {
            const dates = {dates: datesArray};
            return { ...prevDates, ...dates };
          });
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
    const fetchInfosHours = async () => {
      try {
        const token = await AsyncStorage.getItem('token_API');

        if (token && dataEqp) {
          const response = await http.get('/infos', {
            params: {
              equipmentSerialNumber: serialNumber,
              filter: 'hours',
              infosType: 'airMoisture',
            },
          });

          const data = response.data;
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
  }, [dataEqp, serialNumber]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const token = await AsyncStorage.getItem('token_API');

        if (token) {
          while (datesRequestBody.length <= 0) {
            await new Promise(resolve => setTimeout(resolve, 5000));
          }
          const response = await http.post(
            '/infos/statistic',
            datesRequestBody,
            {
              params: {
                equipmentSerialNumber: serialNumber,
                filter: 'day',
              },
            },
          );
          const statistics = response.data;

          setArrayDias(statistics);
          setMean(statistics[5].airMoisture.mean);
          setMode(statistics[5].airMoisture.mode);
          setMedian(statistics[5].airMoisture.median);
          setStandardDeviation(
            statistics[5].airMoisture.standardDeviation,
          );
          setKurtosis(statistics[5].airMoisture.kurtosis);
          setSkewness(statistics[5].airMoisture.skewness);
          setHydrationProbability(statistics[5].hydrationProbability);
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
  }, [dataEqp, datesRequestBody, infos, serialNumber]);

  useEffect(() => {
    const fetchStatisticsHours = async () => {
      try {
        const token = await AsyncStorage.getItem('token_API');

        if (token && dataEqp) {
          const response = await http.post('/infos/statistic', null, {
            params: {
              equipmentSerialNumber: serialNumber,
              filter: 'hours',
            },
          });
          const statistics = response.data;
          setMeanHour(statistics[0].airMoisture.mean);
          setModeHour(statistics[0].airMoisture.mode);
          setMedianHour(statistics[0].airMoisture.median);
          setStandardDeviationHour(
            statistics[0].airMoisture.standardDeviation,
          );
          setKurtosisHour(statistics[0].airMoisture.kurtosis);
          setSkewnessHour(statistics[0].airMoisture.skewness);
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
  }, [dataEqp, serialNumber]);

  useEffect(() => {
    const perDay = [];
    if (arrayDias && arrayDias.length > 0) {

      for (let i = 0; i < 5; i++) {
        const date = arrayDias[i].date;
        const meanDias = parseFloat(arrayDias[i].airMoisture.mean);
        perDay.push({ 'date': date, 'mean': meanDias });
      }

    }
      const newData = {
        Dias: {
          x: perDay.map(entry =>
            moment(entry.date, 'DD/MM/YYYY').format('DD-MM'),
          ),
          y: perDay.map(entry => entry.mean),
        },
        Horas: {
          x: perHour.map(entry => moment(entry.time, 'HH:mm:ss').format('HH')),
          y: perHour.map(entry => entry.airMoisture),
        },
      };
      setDados(newData);
  }, [arrayDias, perHour]);

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
              <Text name>{mocks.ar.name}</Text>
              <Text welcome>Dos últimos 5 dias</Text>
            </Block>
            {selectDia()}
          </Block>
          <InteractiveChart xValue={dateList} yValue={value} />
        </Block>

        <Block flex column space="around">
          <Dados title="Média" value={mean} title2="Moda" value2={mode} />
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
        </Block>
          <Probabilidade
            title="Probabilidade planta hidratada"
            value={hydrationProbabilityDay + ' %'}
          />
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
              <Text name>{mocks.ar.name}</Text>
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
        </Block>
          <Probabilidade
            title="Probabilidade planta hidratada"
            value={hydrationProbabilityHour + ' %'}
          />
      </ScrollView>
    );
  }
  return selectedOption === 'Dias' ? Dias() : Horas();
}

UmidadeDoAr.defaultProps = {
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
