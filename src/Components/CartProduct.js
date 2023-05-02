import logo from "../images/Imagem-Raio-PNG.png";
import styled from "styled-components";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import { useState } from "react";

export default function CartProduct({ product }) {
  const [counter, setCounter] = useState(1);
  function increaseCounter(){
    setCounter((count) => count + 1);
  };

  function decreaseCounter(){
    if (counter > 1) setCounter((count) => count - 1);
  };

  const { name } = product;
  return (
    <ProductBox>
      <ProductInfo>
        <img src={logo} alt="" />
        <span>
          <div>{name}</div>
          <p>Gamer</p>
        </span>
      </ProductInfo>
      <ProductSubInfo>
        <p>Quantidade:</p>
        <MinusCircleStyle onClick={decreaseCounter} />
        <p>{counter}</p>
        <PlusCircleStyle onClick={increaseCounter} />
      </ProductSubInfo>
      <ProductSubInfo>
        <div>
          <p>Remover</p>
          <TrashStyle />
        </div>
      </ProductSubInfo>
      <ItemValue>RS 5,00</ItemValue>
    </ProductBox>
  );
}

const ProductInfo = styled.div`
  display: flex;
  gap: 20px;
  div {
    min-width: 150px;
    font-size: 23px;
    width: 1px;
  }
  p {
    color: red;
  }
`;

const ItemValue = styled.div`
  font-size: 20px;
  min-width: 80px;
`;

const TrashStyle = styled(BsTrashFill)`
  font-size: 20px;
`;

const MinusCircleStyle = styled(AiFillMinusCircle)`
  cursor: pointer;
  font-size: 20px;
  color: red;
`;

const PlusCircleStyle = styled(AiFillPlusCircle)`
  cursor: pointer;
  font-size: 20px;
  color: green;
`;

const ProductSubInfo = styled.div`
  display: flex;
  font-size: 20px;
  gap: 5px;
  div{
    cursor: pointer;
    display:flex;
    gap:10px;
  }
`;

const ProductBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  img {
    width: 80px;
    height: 80px;
  }
`;
