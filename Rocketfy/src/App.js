import React from 'react';
import {DndProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import GlobalStyle from './Styles/global';

import Header from '../src/Components/Header';
import Board from '../src/Components/Board';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header/>
      <Board />

      <GlobalStyle/>
    </DndProvider>  
  );
}

export default App;
