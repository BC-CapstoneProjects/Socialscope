import styled from 'styled-components'

const ContentContainer = styled.div`
  background: ${props => props.theme.colors.primary};
  padding: 4rem 6rem;
  margin: 25px auto;
  max-width: 75%;
  min-height: 75vh;

  @media screen and (max-width: 1017px) {
    max-width: 750px;
  }

  @media screen and (max-width: 750px) {
    padding: 3rem 4rem;
  }

  @media screen and (max-width: 450px) {
    padding: 1rem;
    margin: 10px auto;
  }
`;

export default ContentContainer;