import React, {ReactElement} from 'react';
import {Provider} from 'react-redux';
import {StackNavigator} from './navigation/StackNavigator';
import store from './store/store';

const App = (): ReactElement => {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
};

export default App;
