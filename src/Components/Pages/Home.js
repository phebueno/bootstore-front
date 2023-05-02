import styled from "styled-components";
import Header from "../Header.js";
import ProductCard from "../ProductCard.js";
import { useEffect, useState } from "react";
import URL_Base from "../../URL_Base.js";
import axios from "axios";
import { Oval } from "react-loader-spinner";

export default function Home() {
  const [products, setProducts] = useState();

  useEffect(() => {
    axios
      .get(`${URL_Base}/home`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      <Content>
        <ProductsWrapper>
        {!products && <Oval color="#F07622" secondaryColor="#FEEC2C"/>}
          {products &&
            products.map((product) => (
              <ProductCard
                id={product._id}
                name={product.name}
                img={product.url}
                price={product.value}
              />
            ))}
        </ProductsWrapper>
      </Content>
    </>
  );
}

const Content = styled.div`
  width: 100%;
  margin-top: 180px;

  display: flex;
  justify-content: center;
`;

const ProductsWrapper = styled.div`
  width: 90%;
  padding: 0 30px;
  gap: 30px;

  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
