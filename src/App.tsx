import React, {ReactElement} from 'react';
import {StackNavigator} from './navigation/StackNavigator';
import {Provider} from 'react-redux';
import store from './store/store';

const App = (): ReactElement => {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
};

export default App;
