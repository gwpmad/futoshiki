import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import { AppContainer, Content, Grid, Title } from 'components';
import { configureStore, unregister } from 'core';
import { GlobalStyles, theme } from 'styles';

const store = configureStore();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Provider store={store}>
      <AppContainer>
        <Content className="content">
          <Title>Futoshiki</Title>
          <Grid />
        </Content>
      </AppContainer>
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

unregister();
