import React from "react";
import { Link } from "react-router-dom";
import ParticlesEffect from "../Components/ParticlesEffect";
import styled from "styled-components";

const Home = () => {
  return (
    <S.Container>
      <ParticlesEffect />
      <Link to="/Main">
        <S.Btn>Hello</S.Btn>
      </Link>
    </S.Container>
  );
};
export default Home;

const S = {
  Container: styled.div`
    background-color: whitesmoke;
    width: 100%;
    height: 100%;
  `,

  Btn: styled.button`
    color: blue;
  `,
};
