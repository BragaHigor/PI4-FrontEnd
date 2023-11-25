# SoloSmart - Mobile App
Este repositório contém o código-fonte de um aplicativo móvel desenvolvido em React Native para monitorar as condições de uma horta, exibindo estatísticas detalhadas de umidade do solo, umidade do ar e temperatura. Os dados são coletados por sensores DHT22 conectados a uma placa ESP32, e as informações são armazenadas em um servidor Node.js com Express e MongoDB. A autenticação de usuários é realizada por meio de tokens, permitindo o acesso seguro às informações dos sensores.


## Stack utilizada

**Front-end:** React, CSS

**Back-end:** Node, Express


## Instalação

Clone este repositório em sua máquina local:

```bash
  git clone https://github.com/BragaHigor/PI4-FrontEnd.git
```
Navegue até o diretório do projeto:    
```bash
  cd nome-do-repositorio
```
Instale as dependências do projeto:   
```bash
  npm install
```
Inicie o aplicativo:  
```bash
  npx react-native run-android
```

## Funcionalidades

- Autenticação de Usuários: Os usuários podem se autenticar no aplicativo usando tokens.

- **Visualização de Dados:** O aplicativo exibe gráficos interativos usando a biblioteca React-Native SVG Charts para mostrar as condições de umidade do solo, umidade do ar e temperatura ao longo de dias e horas.

- **Estatísticas Avançadas:** Além dos gráficos, o aplicativo também calcula e exibe estatísticas avançadas para cada sensor, incluindo média, moda, mediana, curtose, assimetria, desvio padrão e probabilidade de planta hidratada.


## Contribuindo

Sinta-se à vontade para contribuir para o desenvolvimento deste projeto. Faça um fork do repositório, faça suas alterações e envie um pull request.


## Autores

- [@PedroNevesHespanhol](https://www.github.com/PedroNevesHespanhol)
- [@VanderleiJunior](https://www.github.com/VanderleiJunior)
- [@BragaHigor](https://www.github.com/BragaHigor)
- [@cassiotakarada](https://www.github.com/cassiotakarada)
- [@BrenoTNK](https://www.github.com/BrenoTNK)
