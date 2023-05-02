import styled from "styled-components";
import Header from "../Header.js";
import ProductCard from "../ProductCard.js";
import { useEffect, useState } from "react";
import { getProducts } from "../../services/api.js";

export default function Home() {
  const [products, setProducts] = useState();

  useEffect(() => {
    async function getData() {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch (err) {
        alert(err.response.data);
      }
    }
    getData();
    console.log(products);
  }, []);

  return (
    <>
      <Header />
      <Content>
        <ProductsWrapper>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          {/* {products?.map(<ProductCard />)} */}
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
  /* background: white; */

  width: 90%;
  padding: 0 30px;
  gap: 30px;

  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
