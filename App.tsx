import React from 'react';
import { Provider } from 'react-native-paper';
import { theme } from './App.style';
import { AppNavigator } from './src/app.navigator';

const App = () => {
  return (
    <Provider theme={theme}>
      <AppNavigator />
    </Provider>
  )
}

export default App;
