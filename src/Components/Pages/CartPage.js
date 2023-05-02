import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import URL_Base from "../../URL_Base.js";
import logo from "../../images/Imagem-Raio-PNG.png";
import CartProduct from "../CartProduct.js";
import Header from "../Header.js";
import { useNavigate } from "react-router-dom";

export default function Cart({user, setUser}) {
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [address, setAddress] = useState(null);
  const [open, setOpen] = useState("none");
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  function updateCart(arr) {
    const subTotal = arr.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.value * currentValue.qty,
      0
    );
    return subTotal;
  }

  useEffect(() => {
    const {token, userName} = JSON.parse(localStorage.getItem("userAuth"));
    if(!token) navigate("/sign-in");
    if(!user) setUser(userName); //se mudar o caminho da sessão, tenta obter o usuário pelo localStorage
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
        setSubTotal(() => updateCart(res.data));
      })
      .catch((err) => {
        console.log(err.response);
        if(err.response.status===401) navigate("/sign-in");
      });
  }, [user, setUser, navigate]);

  function increaseCounter(id) {
    const newCount = cart.map((item) => {
      if (item.productId === id) {
        return { ...item, qty: item.qty + 1 };
      }
      return item;
    });
    setCart(newCount);
    setSubTotal(() => updateCart(newCount));
  }

  function decreaseCounter(id) {
    const newCount = cart.map((product) => {
      if (product.productId === id) {
        if (product.qty > 1) return { ...product, qty: product.qty - 1 };
      }
      return product;
    });
    setCart(newCount);
    setSubTotal(() => updateCart(newCount));
  }

  function saveCart() {
    const {token} = JSON.parse(localStorage.getItem("userAuth"));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = cart.map(({ productId, qty }) => ({ productId, qty }));
    const url = `${URL_Base}cart`;
    axios
      .put(url, { productIdList: body }, config)
      .then((res) => {
        console.log("OK!");
        //Substituir por update local depois
        window.location.reload(false);
      })
      .catch((err) => console.log(err.response));
  }

  function checkout() {
    if(cart.length===0) return alert("Seu carrinho está vazio!");
    let address = prompt("Digite o endereço de entrega");
    while (!address) {
      alert("Endereço de entrega é obrigatorio");
      address = prompt("Digite o endereço de entrega");
    }
    setAddress(address);
    setOpen("flex");
  }

  function backCart() {
    setOpen("none");
    setConfirm(false);
  }

  function confirmOrder() {
    setConfirm(true);
    const {token} = JSON.parse(localStorage.getItem("userAuth"));
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const body = {address, productIdList: cart, total:Number(subTotal) };
    const url = `${URL_Base}checkout`;
    axios
      .post(url, body, config)
      .then((res) => {
        console.log("OK!");
        //Substituir por update local depois
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err.response);
        alert('Algo deu errado com o seu pedido! Tente novamente.')
      });
  }

  return (
    <>
      <Header />
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
                <strong>
                  R$ {subTotal.toFixed(2).toString().replace(".", ",")}
                </strong>
              </SubTotalValue>
            </ProductsContainer>
          )}
        </ProductList>
        <CheckoutBox>
          <CheckoutInfoList>
            <div>
              <span>Subtotal:</span>
              <strong>
                R$ {subTotal.toFixed(2).toString().replace(".", ",")}
              </strong>
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
            <strong>
              R$ {subTotal.toFixed(2).toString().replace(".", ",")}
            </strong>
          </TotalValue>
          <button onClick={checkout}>Checkout</button>
        </CheckoutBox>
      </CartPageContent>

      <BlurGray display={open}>
        <Check confirm={confirm ? "none" : "flex"}>
          <Logo>
            <div>
              <img src={logo} alt="" />
              <h1>KaTchau</h1>
            </div>
            <h1 onClick={backCart}>X</h1>
          </Logo>

          <Form>
            <h1>Comprador:</h1>
            <p>{user}</p>
            <h1>Endereço de entrega:</h1>
            <p>{address}</p>
            <h1>Itens da entrega:</h1>
            <ul>
              {cart.map((product, index) => (
                <li key={index}>
                  {product.qty}x {product.name}
                </li>
              ))}
            </ul>
            <h1>Total:</h1>{" "}
            <p>
              R$
              {subTotal.toFixed(2).toString().replace(".", ",")}
            </p>
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
  display: ${(props) => props.display};
  z-index: 101;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: "Roboto", sans-serif;
  background-color: rgba(199, 199, 199, 0.5);
`;

const Check = styled.div`
  width: 400px;
  height: 450px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${(props) => props.confirm};
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-radius: 7px;
  padding: 7px 0;
  button {
    width: 98%;
    background-color: #f75a05;
    font-family: "Bruno Ace SC", cursive;
    color: #ffffff;
    border: 0;
    border-radius: 7px;
    margin-top: 10px;
    height: 50px;
    cursor: pointer;
  }
`;
const Logo = styled.div`
  width: 98%;
  height: 75px;
  background-color: #f75a05;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 165px;
    font-family: "Bruno Ace SC", cursive;
    color: #ffffff;
  }
  img {
    width: 50px;
  }
  > h1 {
    position: absolute;
    right: 25px;
    font-size: 30px;
    color: #ffffff;
    cursor: pointer;
  }
`;

const Form = styled.form`
  height: 55%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
  h1 {
    font-size: 20px;
    font-family: "Bruno Ace SC", cursive;
    font-weight: bold;
  }
  p, li{
    font-size: 20px;
    margin-left:2%;
  }
`;

const Confirm = styled.div`
  width: 600px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${(props) => props.confirm};
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-radius: 7px;
  padding: 7px 0;
  > h1 {
    font-size: 23px;
    margin-bottom: 45px;
    font-family: "Bruno Ace SC", cursive;
  }
`;

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
    font-family: "Bruno Ace SC", cursive;
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
  border-top: 1px solid #ccc;
  margin: 20px 0;
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
  margin-top: 180px;
  display: flex;
  width: 100%;
  gap: 10px;
  padding: 0 10px;
`;
