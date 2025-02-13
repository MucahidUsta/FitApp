import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigation from './src/navigation/RootNavigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <RootNavigation />
    </SafeAreaProvider>
  );
};

export default App;