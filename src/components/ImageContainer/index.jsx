import styled from 'styled-components';

const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const StyledContainer = styled.div`
  max-width: 90%;
  max-height: 90%;
  width: 90%;
  height:90%;
  margin-bottom: 1rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => generateRandomColor()};
  border-radius:8px;
  img {
    min-width:232px;
    min-height: 251.6px;
    max-width: 90%;
    max-height: 90%; 
    width: auto; 
    height: auto;
    margin: auto; 
    object-fit: cover; 
  }
`;

export default StyledContainer;
