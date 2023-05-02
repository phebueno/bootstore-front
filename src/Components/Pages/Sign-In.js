import axios from "axios";
import styled from "styled-components";
import logo from "../../images/Imagem-Raio-PNG.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import URL_Base from "../../URL_Base";

export default function SignIn({setUser}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  function login(e) {
    e.preventDefault();
    const obj = {
      email,
      password,
    };
    axios
      .post(`${URL_Base}/sign-in`, obj)
      .then((res) => {
        const dadosSerializados = JSON.stringify(res.data);
        localStorage.setItem("userAuth", dadosSerializados);
        setUser(res.data.userName);
        navigate("/");
      })
      .catch((err) => alert(err.response.data));
  }

  return (
    <>
      <Container>
        <Logo>
          <div>
            <img src={logo} alt="" />
            <h1>KaTchau</h1>
          </div>
        </Logo>
        <Form onSubmit={login}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Digite seu email"
            type="email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Digite sua senha"
          />
          <Link to={"/sign-up"}>Ainda não possui uma conta? Cadastre-se</Link>
          <button>Entrar</button>
        </Form>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 500px;
  height: 325px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 7px;
`;
const Logo = styled.div`
  width: 450px;
  height: 75px;
  background-color: #f75a05;
  border-radius: 7px;
  display: flex;
  justify-content: center;
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  margin-top: 5px;
  input {
    width: 450px;
    padding: 13px 2%;
    margin: 10px 0;
    border-radius: 6px;
    border: 1px solid #000000;
    outline: 0;
  }
  button {
    width: 450px;
    background-color: #f75a05;
    font-family: "Bruno Ace SC", cursive;
    color: #ffffff;
    border: 0;
    border-radius: 7px;
    margin-top: 10px;
    height: 40px;
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: black;
  }
`;
