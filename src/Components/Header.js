import styled from "styled-components";
import logo from "../images/Imagem-Raio-PNG.png";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const lsDados = localStorage.getItem("userAuth");

  function navigateToSignIn() {
    if (lsDados) {
      if (window.confirm("Voce deseja sair da sua conta?")) {
        localStorage.removeItem("userAuth");
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }

  function navigateToLogin() {
    navigate("/sign-in");
  }

  function navigateToAcessories() {
    navigate("/home/perifericos");
  }

  function navigateToEletronics() {
    navigate("/home/eletronicos");
  }

  function navigateToCellPhones() {
    navigate("/home/celulares");
  }

  function navigateToHome() {
    navigate("/");
  }

  function navigateToShoppingCart() {
    navigate("/cart");
  }

  return (
    <Container>
      <Wrapper>
        <Logo>
          <img src={logo} alt="" />
          <h1 onClick={navigateToHome}>KaTchau</h1>
        </Logo>

        <UserArea>
          <FaShoppingCart onClick={navigateToShoppingCart} />
          {!localStorage.getItem("userAuth") ? (
            <Login onClick={navigateToLogin}>LOGAR</Login>
          ) : (
            <FaUser onClick={navigateToSignIn} />
          )}
        </UserArea>
      </Wrapper>

      <CategoryWrapper>
        <p onClick={navigateToAcessories}>perifericos</p>
        <VL />
        <p onClick={navigateToEletronics}>eletronicos</p>
        <VL />
        <p onClick={navigateToCellPhones}>celulares</p>
      </CategoryWrapper>
    </Container>
  );
}

const Container = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  height: 150px;
  width: 100%;
  padding: 0 50px;

  background: rgb(255, 246, 45);
  background: linear-gradient(
    0deg,
    rgba(255, 246, 45, 1) 0%,
    rgba(241, 118, 34, 1) 70%
  );

  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 165px;
  font-family: "Bruno Ace SC", cursive;
  font-weight: 700;
  font-size: 44px;
  color: #ffffff;
  cursor: pointer;
  img {
    width: 80px;
  }
`;

const UserArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  svg {
    font-size: 30px;
    color: white;
    cursor: pointer;
  }
`;

const CategoryWrapper = styled.div`
  width: 100%;
  height: 100px;

  font-family: "Bruno Ace SC", cursive;
  font-weight: 700;
  font-size: 20px;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  p {
    cursor: pointer;
  }
`;

const VL = styled.div`
  border-left: 4px solid black;
  height: 100%;
`;

const Login = styled.div`
  background: none;
  border: 2px solid white;
  border-radius: 5px;
  padding: 5px;

  font-family: "Bruno Ace SC", cursive;
  color: white;
  font-weight: 700;
  font-size: 20px;
`;
