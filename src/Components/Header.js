import styled from "styled-components";
import logo from "../images/Imagem-Raio-PNG.png";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  function navigateToSignIn() {
    navigate("/sign-in");
  }

  return (
    <Container>
      <Wrapper>
        <Logo>
          <img src={logo} alt="" />
          <h1>KaTchau</h1>
        </Logo>

        <UserArea>
          <FaShoppingCart />
          <FaUser onClick={navigateToSignIn} />
        </UserArea>
      </Wrapper>

      <CategoryWrapper>
        <p>Categoria Teste 1</p>
        <VL />
        <p>Categoria Teste 2</p>
        <VL />
        <p>Categoria Teste 3</p>
        <VL />
        <p>Categoria Teste 4</p>
        <VL />
        <p>Categoria Teste 5</p>
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
