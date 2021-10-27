import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import {store, persistor} from 'store/index';

import Loading from 'view/components/Loading';
import App from './app/App';

import {name as appName} from './app.json';

enableScreens();
const queryClient = new QueryClient();

const Elegant = () => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);

AppRegistry.registerComponent(appName, () => Elegant);
