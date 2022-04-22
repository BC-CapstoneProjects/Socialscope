import React from 'react';
import styled from 'styled-components';

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  &.light-shade {
    background-color: ${props => props.theme.colors.secondary};
  }
  &.dark-shade {
    background-color: ${props => props.theme.colors.primary};
  }
`;

const TableCell = styled.div`
  flex: 1; 
  padding: 0.1rem;
  text-align: center;
  min-width: 0;
  word-wrap: break-word;
`;

const ToggleButton = styled.button`
  background: ${props => (props.shadeClass==='dark-shade') ? props.theme.colors.secondary : props.theme.colors.primary};  // TODO: repeat button style
  padding: 1px; 
  width: 21px;
  border: none;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
`;

const DescriptionContainer = styled(TableCell)`
  flex: 1;
  padding: 10px;
  display: ${props => props.minimized ? 'none' : 'flex'};
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 0.5rem;
`;

const DescriptionTitle = styled.div`
  font-weight: bold;
`;

const PreviewRow = (props) => {

  function renderRow() {
    const shadeClass = (props.number % 2 === 0) ? 'dark-shade' : 'light-shade';
    let cellContent = [];
    for (const field in props.displayFields) {
      cellContent.push(
        <TableCell key={field}>
          {props.data.post[field]}
        </TableCell>  
      );
    }
    cellContent.push(
      <TableCell key='button'>
        <ToggleButton shadeClass={shadeClass} onClick={() => props.descriptionToggleHandler()} data-cy='description-toggle-button'>
          {props.data.descriptionMinimized ? '+' : '-'}
        </ToggleButton>
      </TableCell>
    );
    const descriptionSection = (
      <DescriptionContainer minimized={props.data.descriptionMinimized}>
        <DescriptionTitle data-cy="description-text-container">{props.data.post.title}</DescriptionTitle>
        <div data-cy="description-text-container">
          {
            (props.data.post.text.length === 0 && props.data.post.has_embedded_media === true)
            ? '[Body consists of an embedded link or non-textual media]'
            : props.data.post.text
          }
        </div>
      </DescriptionContainer>
    );

    return (
      <>
        <TableRow key={props.number} className={'data-row ' + shadeClass}>
          {cellContent}
        </TableRow>
        <TableRow className={'description-row ' + shadeClass}> 
          {descriptionSection}
        </TableRow>
      </>
    );
    
  }

  return (
    renderRow()
  );

}

export default PreviewRow;