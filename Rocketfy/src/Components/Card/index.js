//useContext acessa infor de um contexto
import React, {useRef, useContext} from 'react';
//utilitário de criação de 'arrasta e solta' para interfaces no reactJS
// Documentação: https://react-dnd.github.io/react-dnd/about 
import {useDrag, useDrop} from 'react-dnd';
import BoardContext from '../Board/context';
import {Container, Label} from './styles';

export default function Card({data, index, listIndex}) {
  //a função useRef retorna um obj mutável na render de tela
  // https://medium.com/trabe/react-useref-hook-b6c9d39e2022
  const ref = useRef();
  const {move} = useContext(BoardContext);

  const [{isDragging}, dragRef] = useDrag({
    item: {type: 'CARD', index, listIndex}, //id:data.id, content: data.content
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
  //quais elementos o DROP irá receber do CARD
    accept: 'CARD',
    //o ITEM identifica qual o CARD está sendo arrastado
    //o MONITOR permite inf (monitora) sobre o CARD   
    hover(item, monitor){
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;
      // esta arrastando o CARD para a mesma possicão?
      if(draggedIndex === targetIndex && draggedListIndex === targetListIndex){
        return;
      }
      //retornar o tamanho do elemento (caixa de CARD)
      const targetSize = ref.current.getBoundingClientRect();
      //retornar o tamanho do CARD (metade) inferior - superior / 2
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;
      //retornar o quanto do item foi arrastado em tela
      const draggedOffset = monitor.getClientOffset();
      //retorna a distancia do arrasto do elemento da parte superior da tela 
      const draggedTop = draggedOffset.y - targetSize.top;

      //condições para identificar em qual posição o elemento será inserido dentro 
      //do container de listas (abaixo ou acima)
      if(draggedIndex < targetIndex && draggedTop < targetCenter){
        return;
      }
      if(draggedIndex > targetIndex && draggedTop > targetCenter){
        return;
      }

      //dentro da função MOVE do CONTEXTO é passado de onde para onde
      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={dragRef} isDragging={isDragging}>
      <header>
        {data.labels.map(label => <Label key={label} color={label} />)}
      </header>
      <p>{data.content}</p>
      {data.user && <img src={data.user} alt=""/>}
    </Container>
  );
}
