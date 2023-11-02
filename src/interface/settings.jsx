import React from 'react';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import * as theme from '../styles/theme';

const settings = {
  light: {
    name: 'Umidade do Ar',
    icon: ({size, color, ...props}) => (
      <MaterialCommunityIcon
        name="zodiac-gemini"
        size={size || theme.sizes.font}
        color={color || theme.colors.accent}
        {...props}
      />
    ),
  },
  ac: {
    name: 'Temperatura',
    icon: ({size, color, ...props}) => (
      <MaterialCommunityIcon
        name="air-conditioner"
        size={size || theme.sizes.font}
        color={color || theme.colors.accent}
        {...props}
      />
    ),
  },
  temperature: {
    name: 'Umidade do Solo',
    icon: ({size, color, ...props}) => (
      <MaterialCommunityIcon
        name="temperature-celsius"
        size={size || theme.sizes.font}
        color={color || theme.colors.accent}
        {...props}
      />
    ),
  },
  // fan: {
  //   name: 'Fan',
  //   icon: ({size, color, ...props}) => (
  //     <MaterialCommunityIcon
  //       name="fan"
  //       size={size || theme.sizes.font}
  //       color={color || theme.colors.accent}
  //       {...props}
  //     />
  //   ),
  // },
  // 'wi-fi': {
  //   name: 'Wi-Fi',
  //   icon: ({size, color, ...props}) => (
  //     <FontAwesomeIcon
  //       name="star-o"
  //       size={size || theme.sizes.font}
  //       color={color || theme.colors.accent}
  //       {...props}
  //     />
  //   ),
  // },
  // electricity: {
  //   name: 'Electricity',
  //   icon: ({size, color, ...props}) => (
  //     <MaterialIcon
  //       name="power"
  //       size={size || theme.sizes.font}
  //       color={color || theme.colors.accent}
  //       {...props}
  //     />
  //   ),
  // },
};

export default settings;
