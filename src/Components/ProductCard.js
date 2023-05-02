import styled from "styled-components";

export default function ProductCard(props) {
  return (
    <Container>
      <ProductImage src={props.img} />
      <Description>
        <p>{props.name}</p>
        <p>R$ {props.price}</p>
      </Description>
      <ToCart>Adiconar ao carrinho</ToCart>
    </Container>
  );
}

const Container = styled.div`
  background: #f7f7f7;
  font-size: 15px;
  font-family: "Bruno Ace SC", cursive;

  width: 300px;
  height: 400px;
  padding: 10px;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const ProductImage = styled.img`
  width: 80%;
`;

const Description = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-around;
`;

const ToCart = styled.button`
  cursor: pointer;
  border-radius: 5px;
  background: rgba(241, 118, 34, 1);
  transition: 0.5s;
  :hover {
    background: rgba(255, 246, 45, 1);
  }
  font-size: 18px;
  font-weight: bold;

  width: 100%;
  height: 60px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
