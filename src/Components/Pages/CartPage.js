import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import URL_Base from "../../URL_Base.js";
import logo from "../../images/Imagem-Raio-PNG.png"
import CartProduct from "../CartProduct.js";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState(null)
  const [open, setOpen] = useState("none")
  const [confirm, setConfirm] = useState(false)

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
      })
      .catch((err) => console.log(err.response));
  }, []);

  function checkout() {
    let address = prompt("Digite o endereço de entrega")
    while (address === "") {
      alert("Endereço de entrega é obrigatorio")
      address = prompt("Digite o endereço de entrega")
    }
    setAddress(address)
    setOpen("flex")

  }

  function backCart() {
    setOpen("none")
    setConfirm(false)
  }

  function confirmOrder() {
    setConfirm(true)
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
                {cart.map((product) => (
                  <CartProduct product={product} />
                ))}
              </ul>
              <SubTotalValue>
                <span>Subtotal:</span>
                <strong>R$ 10,00</strong>
              </SubTotalValue>
            </ProductsContainer>
          )}
        </ProductList>
        <CheckoutBox>
          <CheckoutInfoList>
            <div>
              <span>Subtotal:</span>
              <strong>R$ 10,00</strong>
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
            <strong>R$ 0,00</strong>
          </TotalValue>
          <button onClick={checkout}>Checkout</button>
        </CheckoutBox>
      </CartPageContent>

      <BlurGray display={open} >
        <Check confirm={confirm ? "none" : "flex"}>
          <Logo>
            <div>
              <img src={logo} alt="" />
              <h1>KaTchau</h1>
            </div>
            <h1 onClick={backCart}>X</h1>
          </Logo>

          <Form >
            <h1>{`Comprador: ${"ivan"}`}</h1>
            <h1>{`Endereço de entrega: ${address}`}</h1>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
            <h1>{`Total: 20`}</h1>
          </Form>
          <button onClick={confirmOrder}>Confirmar Pedido</button>
        </Check>

        <Confirm confirm={confirm ? "flex" : "none"}>
          <Logo>
            <div>
              <img src={logo} alt="" />
              <h1>KaTchau</h1>
            </div>
            <h1 onClick={backCart}>X</h1>
          </Logo>

          <h1>Seu pedido vai chegar em um KaTchau!</h1>
        </Confirm>
      </BlurGray>
    </>
  );
}

const BlurGray = styled.div`
  position: absolute;
  display: ${props => props.display} ;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: 'Bruno Ace SC', cursive;
  background-color: rgba(199, 199, 199, 0.5);
`

const Check = styled.div`
    width: 600px;
    height: 450px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: ${props => props.confirm};
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    border-radius: 7px;
    padding: 7px 0;
    button{
        width: 98%;
        background-color: #f75a05;
        font-family: 'Bruno Ace SC', cursive;
        color: #FFFFFF;
        border: 0;
        border-radius: 7px;
        margin-top: 10px;
        height: 50px;
        cursor: pointer;
    }
`
const Logo = styled.div`
    width: 98%;
    height: 75px;
    background-color: #f75a05;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 165px;
        font-family: 'Bruno Ace SC', cursive;
        color: #FFFFFF;
    }
    img{
        width: 50px;
    }
  > h1{
    position: absolute;
    right: 25px;
    font-size: 30px;
    color: #FFFFFF;
    cursor: pointer;
  }
`

const Form = styled.form`
  height: 55%;
  width: 98%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
  h1,li{
    font-size: 20px;
  }
`

const Confirm = styled.div`
    width: 600px;
    height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: ${props => props.confirm};
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: white;
    border-radius: 7px;
    padding: 7px 0;
    > h1{
      font-size: 23px;
      margin-bottom: 45px;
      font-family: 'Bruno Ace SC', cursive;
    }
`

const SubTotalValue = styled.div`
  display: flex;
  gap: 30px;
  border-top: 1px solid #ccc;
  justify-content: flex-end;
  padding: 20px;
  font-size: 23px;
`;

const ProductsContainer = styled.div`
  display: flex;
  height: inherit;
  flex-direction: column;
  justify-content: space-between;
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
`;

const Aviso = styled.div`
  display: flex;
  height: inherit;
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
  height: 300px;
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
