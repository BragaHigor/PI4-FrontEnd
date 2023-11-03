/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Grid, LineChart, XAxis, YAxis} from 'react-native-svg-charts';
import {View} from 'react-native';
import * as theme from '../../styles/theme';

export default function AxesExample() {
  const Y = [10, 20, 30, 40, 50];
  const X = [10, 20, 30, 40, 50];
  const data = [50, 10, 40, 85, 91, 35, 53, 24, 50];
  const axesSvg = {fontSize: 10, fill: theme.colors.black};
  const verticalContentInset = {top: 20, bottom: 20};
  const xAxisHeight = 20;

  return (
    <View style={{height: 300, flexDirection: 'row'}}>
      <YAxis
        data={Y}
        style={{marginBottom: xAxisHeight}}
        contentInset={verticalContentInset}
        svg={axesSvg}
      />
      <View style={{flex: 1, marginLeft: 10}}>
        <LineChart
          style={{flex: 1}}
          data={data}
          contentInset={verticalContentInset}
          svg={{stroke: theme.colors.accent}}>
          <Grid />
        </LineChart>
        <XAxis
          style={{marginHorizontal: -10, height: xAxisHeight}}
          data={X}
          formatLabel={(value, index) => index}
          contentInset={{left: 10, right: 10}}
          svg={axesSvg}
        />
      </View>
    </View>
  );
}
