import React from 'react';
import { ThemeProvider } from 'styled-components';

import {GlobalStyle, GlobalTheme} from '../pages/GlobalStyle';

const TestWrapper = (props) => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <ThemeProvider theme={GlobalTheme}>
        {props.children}
      </ThemeProvider>
    </React.Fragment>
  );
}

export default TestWrapper