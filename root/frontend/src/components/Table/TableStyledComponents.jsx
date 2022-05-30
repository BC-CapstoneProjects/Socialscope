
import styled from 'styled-components';

// table

const TableContainer = styled.div`
border: 2px solid ${props => props.theme.colors.outline};

& svg, & svg * {
  pointer-events: none;
}

`;

const TableHeadContainer = styled.div`

`;

const TableBodyContainer = styled.div`

`;

// head

const HeadRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; 
  color: white;
  min-height: 50px;
  background-color: ${props => props.theme.colors.outline};
`;

const HeadCell = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0.1rem;
  margin-bottom: 2px;
  text-align: center;
`;

const HeadText = styled.div`
  font-size: 20px;
  flex: 1;
`;

const SortButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SortButton = styled.button`
  background-color: ${props => props.theme.colors.secondary}; // TODO: repeat button style
  border: none;
  border-radius: 5px;
  outline: none;
  cursor: pointer;

  margin: 1px;
  height: 20px;
  width: 20px;

  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.secondary_dark};
  }
`;

// row

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
  padding: 0.2rem 0.1rem;
  text-align: center;
  min-width: 0;
  word-wrap: break-word;
`;

export {TableContainer, TableHeadContainer, TableBodyContainer,  
  HeadRow, HeadCell, HeadText, SortButtonContainer, SortButton, 
  TableRow, TableCell};