import React from "react";
import { Link } from "react-router-dom";
import ParticlesEffect from "../Components/ParticlesEffect";
import intro from "../assets/intro.png";
import styled from "styled-components";

const Home = () => {
  return (
    <S.Container>
      <S.BackgroundImg>
        <S.InnerContainer>
          <S.TitleBox>
            <S.Title>Scent of Dress</S.Title>
            <S.SubTitle>옷에 어울리는 향을 찾아드립니다.</S.SubTitle>
          </S.TitleBox>
          <Link to="/Main">
            <S.NextpageBtn>next</S.NextpageBtn>
          </Link>
        </S.InnerContainer>
      </S.BackgroundImg>
      <ParticlesEffect />
    </S.Container>
  );
};
export default Home;

const S = {
  Container: styled.div`
    background-color: #bebfbe;
  `,
  BackgroundImg: styled.div`
    background-image: url(${intro});
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    text-align: center;
  `,
  InnerContainer: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  TitleBox: styled.div`
    padding-block: 5vh;
    height: 70vh;
  `,

  Title: styled.p`
    margin: 0;
    font-size: 70px;
  `,
  SubTitle: styled.p`
    margin: 0;
    font-size: 20px;
    letter-spacing: 2px;
  `,
  NextpageBtn: styled.div`
    background: #ffffff;
    border: 3px solid #000000;
    border-radius: 100px;
    color: #444;
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 2px;
    text-transform: uppercase;
    width: 30vw;
    padding: 12px 22px;
  `,
};
