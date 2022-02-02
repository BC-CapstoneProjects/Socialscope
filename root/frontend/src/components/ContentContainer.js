import styled from 'styled-components'

const ContentContainer = styled.div`
  background: ${props => props.theme.colors.primary};
  /*
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  */
  padding: 4rem 6rem;
  margin: 25px auto;
  max-width: 75%;

  @media screen and (max-width: 1017px) {
    max-width: 750px;
  }

  @media screen and (max-width: 750px) {
    padding: 3rem 4rem;
  }

  @media screen and (max-width: 450px) {
    padding: 2rem;
  }

  @media screen and (max-width: 350px) {
    padding: 1rem;
  }
`;

export default ContentContainer;