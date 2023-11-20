// PrivateRoute.js
import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PrivateRouteProps {
  children: React.ReactNode;
  navigation: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({children, navigation}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<null | boolean>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem('token_API');
      setIsAuthenticated(!!token);
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    return <ActivityIndicator />;
  }

  if (!isAuthenticated) {
    if (navigation && navigation.replace) {
      navigation.replace('Login');
    } else {
      console.warn(
        'A propriedade "navigation" está ausente ou não tem o método "replace".',
      );
    }
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
