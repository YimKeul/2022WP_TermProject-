import React from "react";
import { Link } from "react-router-dom";
import ParticlesEffect from "../Components/ParticlesEffect"; //화면 효과
import images from "../assets/images";
import styled from "styled-components";

const Home = () => {
  return (
    <S.Container>
      <S.BackgroundImg>
        <S.InnerContainer>
          <S.TitleBox>
            <S.Title>Scent of Dress</S.Title>
            <S.SubTitle>옷에 어울리는 향수를 찾아드립니다.</S.SubTitle>
          </S.TitleBox>
          {/* Link : 페이지 이동 */}
          <Link
            to="/Main"
            style={{
              textDecoration: "none",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <S.NextpageBtn>next</S.NextpageBtn>
          </Link>
        </S.InnerContainer>
      </S.BackgroundImg>
      {/* 화면 효과 불러옴 */}
      <ParticlesEffect />
    </S.Container>
  );
};
export default Home;

const S = {
  Container: styled.div`
    background-color: #f5f5f5;
  `,
  BackgroundImg: styled.div`
    background-image: url(${images.intro});
    width: 100vw;
    height: 100vh;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    text-align: center;
    //반응형 웹페이지용 저장 :: @media screen ~480px에는 밑 스타일 적용 그 외 기존 설정한 스타일 적용
    @media screen and (max-width: 480px) {
      background-size: cover;
    }
  `,
  InnerContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  TitleBox: styled.div`
    padding-block: 5vh;
    height: 75vh;
  `,

  Title: styled.p`
    margin: 0;
    font-size: 70px;
    color: white;
    @media screen and (max-width: 480px) {
      font-size: 50px;
    }
  `,
  SubTitle: styled.p`
    margin: 0;
    font-size: 20px;
    letter-spacing: 2px;

    @media screen and (max-width: 480px) {
      font-size: 15px;
    }
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
    width: 120px;
    padding: 12px 22px;
    &:hover {
      border: 3px solid #ffffff;
      background-color: rgb(0, 0, 0, 0.5);
      color: rgb(255, 255, 255, 100);
    }
    -webkit-tap-highlight-color: transparent;
  `,
};
