import logo from "../images/Imagem-Raio-PNG.png";
import styled from "styled-components";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsTrashFill } from "react-icons/bs";
import axios from "axios";
import URL_Base from "../URL_Base.js";
import { useNavigate } from "react-router-dom";

export default function CartProduct({ product, increaseCounter, decreaseCounter }) {
  const { productId, name, qty, value } = product;
  const navigate = useNavigate();

  function deleteProduct() {
    const {token} = JSON.parse(localStorage.getItem("userAuth"));
    if(!token) navigate("/sign-in");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(productId);
    const url = `${URL_Base}cart/${productId}`;
    axios
      .delete(url, config)
      .then((res) => {
        console.log("OK!");
        console.log(res.data);
        //Substituir por update local depois
        window.location.reload(false);

      })
      .catch((err) => console.log(err.response));
  }

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
        <MinusCircleStyle onClick={() => decreaseCounter(productId)} />
        <p>{qty}</p>
        <PlusCircleStyle onClick={() => increaseCounter(productId)} />
      </ProductSubInfo>
      <ProductSubInfo>
        <div onClick={deleteProduct}>
          <p>Remover</p>
          <TrashStyle />
        </div>
      </ProductSubInfo>
      <ItemValue>R$ {(value*qty).toFixed(2).toString().replace(".", ",")}</ItemValue>
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
  div {
    cursor: pointer;
    display: flex;
    gap: 10px;
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
