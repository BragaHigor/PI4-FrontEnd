import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function Block(props) {
  const {flex, row, column, center, middle, right, space, style, children} =
    props;

  const blockStyles = [
    styles.block,
    flex && {flex: flex === 'disabled' ? 0 : flex},
    center && styles.center,
    middle && styles.middle,
    right && styles.right,
    space && {justifyContent: `space-${space}`},
    row && styles.row,
    column && styles.column,
    style,
  ];

  return <View style={blockStyles}>{children}</View>;
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    alignItems: 'center',
  },
  middle: {
    justifyContent: 'center',
  },
  right: {
    justifyContent: 'flex-end',
  },
});
