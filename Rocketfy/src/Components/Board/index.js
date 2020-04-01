import React, {useState} from 'react';
import produce from 'immer';
// importando API: https://gist.github.com/diego3g/cdc1fa2fc39b8e7c191ad651b310fab5
import {loadLists} from '../../services/api';
import BoardContext from './context';
import List from '../List';
import {Container} from './styles';

const data = loadLists();

export default function Board() {
  const [lists, setLists] = useState(data);

  //da onde e para onde irei remover o elemento?
  function move(fromList, toList, from, to){
    //PRODUCE recebe infor da listas (lists) o segundo parametro é uma função
    //(draft) que é uma cópia da listagem, onde toda alteração feita no draft
    //o produce vai 'computar' esses dados para o obj de lists (que é imutavel)  
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];

      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged);
    }))
  }

  return (
    //as chaves {{}} indica que é um JS dentro de um JSX e obj
    <BoardContext.Provider value={{lists, move}}>
      <Container>
        {lists.map((list, index) => <List key={list.title} index={index} data={list} />)}
      </Container>
    </BoardContext.Provider>
  );
}
