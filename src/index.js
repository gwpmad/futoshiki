import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import { AppContainer, Content, Grid, BelowGame, Title } from 'components';
import { configureStore, unregister } from 'core';
import { GlobalStyles, theme } from 'styles';

const { persistor, store } = configureStore();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer>
          <Content className="content">
            <Title className="title">Futoshiki</Title>
            <Grid />
            <BelowGame />
          </Content>
        </AppContainer>
      </PersistGate>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

unregister();
