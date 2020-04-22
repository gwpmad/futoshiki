import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import { Content, Grid, Title } from 'components';
import { unregister } from 'core';
import { GlobalStyles, theme } from 'styles';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Content className="content">
      <Title>FUTOSHIKI</Title>
      <Grid />
    </Content>
  </ThemeProvider>,
  document.getElementById('root')
);

unregister();
