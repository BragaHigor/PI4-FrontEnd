import React from 'react';
import {StyleSheet, Text} from 'react-native';
import * as theme from '../styles/theme';

export default function Typography(props) {
  const {
    center,
    right,
    color,
    size,
    height,
    weight,
    spacing,
    h1,
    welcome,
    name,
    caption,
    bold,
    light,
    italic,
    button,
    style,
    children,
  } = props;

  const textStyles = [
    styles.text,
    h1 && styles.h1,
    welcome && styles.welcome,
    name && styles.name,
    button && styles.button,
    center && styles.center,
    right && styles.right,
    color && styles[color], // Use computed styles for color
    size && {fontSize: size},
    bold && styles.bold,
    light && styles.light,
    caption && styles.caption,
    height && {lineHeight: height},
    weight && {fontWeight: weight},
    spacing && {letterSpacing: spacing},
    italic && styles.italic,
    style,
  ];

  return (
    <Text style={textStyles} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: theme.sizes.font,
    color: theme.colors.black,
  },
  bold: {
    fontWeight: 'bold',
  },
  light: {
    fontWeight: '200',
  },
  center: {
    textAlign: 'center',
  },
  right: {
    textAlign: 'right',
  },
  welcome: theme.fonts.welcome,
  name: theme.fonts.name,
  h1: theme.fonts.h1,
  button: theme.fonts.button,
  caption: theme.fonts.caption,
  italic: {
    fontStyle: 'italic',
  },
  // Define color styles
  accent: {
    color: theme.colors.accent,
  },
  black: {
    color: theme.colors.black,
  },
  white: {
    color: theme.colors.white,
  },
  gray: {
    color: theme.colors.gray,
  },
});
