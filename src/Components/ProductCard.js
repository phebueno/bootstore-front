import axios from "axios";
import { useNavigate } from "react-router";
import styled from "styled-components";
import URL_Base from "../URL_Base.js";

export default function ProductCard(props) {
  const navigate = useNavigate();

  function addToCart(id) {
    const userAuth = localStorage.getItem("userAuth");
    if (!userAuth) return navigate("/sign-in");
    const { token } = JSON.parse(userAuth);
    console.log(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `${URL_Base}/cart/${id}`;
    axios
      .post(url, {}, config)
      .then((res) => {
        alert("Item adicionado!");
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 401) navigate("/sign-in");
      });
  }

  return (
    <Container>
      <ProductImage src={props.img} />
      <Description>
        <p>{props.name}</p>
        <p>R$ {props.price.toFixed(2).toString().replace(".", ",")}</p>
      </Description>
      <ToCart onClick={() => addToCart(props.id)}>Adicionar ao carrinho</ToCart>
    </Container>
  );
}

const Container = styled.div`
  background: #f7f7f7;
  font-size: 18px;
  font-family: "Roboto", sans-serif;
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
