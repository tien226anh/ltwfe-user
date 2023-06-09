import styled from "styled-components";
const Main = () => {
  return (
    <MainWrapper>
      <h1>Code here</h1>
    </MainWrapper>
  );
};

const MainWrapper = styled.main`
  max-width: 111rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

export default Main;
