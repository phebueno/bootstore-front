import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import URL_Base from "../../URL_Base.js";
import CartProduct from "../CartProduct.js";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    //adicionar validação de usuário site
    //Authorization: `Bearer ${JSON.parse(token)}
    const token = "tokensupersecretomelhorainda159951";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `${URL_Base}cart`;
    axios
      .get(url, config)
      .then((res) => {
        console.log("OK!");
        setCart(res.data);
        const subTotal = res.data.reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.value*currentValue.qty,
          0
        );
        setSubTotal(subTotal);
      })
      .catch((err) => console.log(err.response));
  }, []);

  function increaseCounter(id) {
    const newCount = cart.map((item) => {
      if (item.productId === id) {
        return {...item, qty: item.qty+1}
      }
      return item;
    });
    setCart(newCount);
  }

  function decreaseCounter(id) {
    const newCount = cart.map((product) => {
      if (product.productId === id) {
        if (product.qty>1) return {...product, qty: product.qty-1}
      }
      return product;
    });
    setCart(newCount);
  }

  function saveCart() {
    const token = "tokensupersecretomelhorainda159951";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = cart.map(({productId,qty})=>({productId,qty}));
    const url = `${URL_Base}cart`;
    axios
      .put(url, {productIdList: body}, config)
      .then((res) => {
        console.log("OK!");
        //Substituir por update local depois
        window.location.reload(false);
      })
      .catch((err) => console.log(err.response));
  }
  return (
    <>
      <div>Carrinho</div>
      <CartPageContent>
        <ProductList>
          {cart && cart.length === 0 && <Aviso>Seu carinho está vazio!</Aviso>}
          {cart && cart.length > 0 && (
            <ProductsContainer>
              <ul>
                {cart.map((product, index) => (
                  <CartProduct
                    key={index}
                    product={product}
                    increaseCounter={increaseCounter}
                    decreaseCounter={decreaseCounter}
                  />
                ))}
              </ul>
              <ButtonContainer>
                <button onClick={saveCart}>Salvar o carrinho</button>
              </ButtonContainer>
              <SubTotalValue>
                <span>Subtotal:</span>
                <strong>R$ {subTotal.toFixed(2).toString().replace(".", ",")}</strong>
              </SubTotalValue>
            </ProductsContainer>
          )}
        </ProductList>
        <CheckoutBox>
          <CheckoutInfoList>
            <div>
              <span>Subtotal:</span>
              <strong>R$ {subTotal.toFixed(2).toString().replace(".", ",")}</strong>
            </div>
            <div>
              <span>Frete:</span>
              <strong>Grátis</strong>
            </div>
            <div>
              <span>Descontos:</span>
              <strong>R$ 0,00</strong>
            </div>
          </CheckoutInfoList>
          <Section></Section>
          <TotalValue>
            <span>Total:</span>
            <strong>R$ {subTotal.toFixed(2).toString().replace(".", ",")}</strong>
          </TotalValue>
          <button>Checkout</button>
        </CheckoutBox>
      </CartPageContent>
    </>
  );
}

const SubTotalValue = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  gap: 30px;
  border-top: 1px solid #ccc;
  justify-content: flex-end;
  padding: 20px;
  font-size: 23px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  button {
    background-color: #f75a05;
    color: #ffffff;
    border: 0;
    border-radius: 7px;
    margin-right: 20px;
    height: 30px;
    width: 200px;
    cursor: pointer;
  }
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  ul {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 30px 20px;
  }
`;

const ProductList = styled.section`
  flex: 1 1 auto;
  min-height: 100px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  display: flex;
  //flex-direction:column;
  justify-content: center;
`;

const Aviso = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Section = styled.div`
  border: 1px solid black;
`;

const TotalValue = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
`;

const CheckoutInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  div {
    display: flex;
    justify-content: space-between;
  }
`;

const CheckoutBox = styled.aside`
  flex: 0 0 300px;
  height: 250px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  padding: 30px;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  button {
    background-color: #f75a05;
    font-family: "Bruno Ace SC", cursive;
    color: #ffffff;
    border: 0;
    border-radius: 7px;
    margin-top: 10px;
    height: 40px;
    cursor: pointer;
  }
`;

const CartPageContent = styled.main`
  //Retirar display flex para versão mobile
  display: flex;
  width: 100%;
  gap: 10px;
  padding: 0 10px;
`;
