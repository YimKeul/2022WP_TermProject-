import React, { useEffect, useState } from "react";
import styled from "styled-components";
import images from "../assets/images";
import { useLocation } from "react-router-dom";
import DB from "../DB.json";

const Result = () => {
  const location = useLocation();
  const D_age = location.state.Age; // 나이 전달
  const D_gender = location.state.Gender; //성별 전달
  const D_fashion = location.state.Fashion; //성별 전달
  const Database = DB.perfume;

  const newDB = Database.filter((data) => {
    if (data.age == D_age && data.sex == D_gender && data.style == D_fashion) {
      return data;
    }
  });
  const randomindex = Math.floor(Math.random() * (newDB.length - 0));
  var ShowData = newDB[randomindex];
  if (ShowData == null) {
    ShowData = {
      idx: 0,
      title: "딥티크 플레르 드 뽀 EDP (75ml)",
      explain: "#오드퍼퓸 #머스크계열",
      sex: "man",
      age: 10,
      style: "댄디",
      img_link:
        "http://img.danawa.com/prod_img/500000/646/921/img/5921646_1.jpg?shrink=330:330&_v=20200720093952",
      link: "http://prod.danawa.com/info/?pcode=5921646&cate=18222429",
    };
  }
  console.log(ShowData);

  return (
    <S.Container>
      <S.ResultBox>
        <S.InTitle>당신에게 어울리는 향수는...</S.InTitle>
        <S.ResultImgbox>
          <S.ResultImg src={ShowData.img_link} />
        </S.ResultImgbox>
        <S.ResultTextBox>
          <S.ResultTitle>{ShowData.title}</S.ResultTitle>
          <S.ResultContext>{ShowData.explain}</S.ResultContext>
          <S.ResultLink
            onClick={() => window.open(`${ShowData.link}`, "_blank")}
          >
            바로가기버튼
          </S.ResultLink>
        </S.ResultTextBox>
      </S.ResultBox>

      <S.ButtonBox>
        <S.ButtonBoxGrid>
          <S.BtnBox style={{ ...{ background: " #fef01b" } }}>
            <S.BtnImg src={images.kakao} />
            <S.BtnText>공유하기</S.BtnText>
          </S.BtnBox>

          <S.BtnBox style={{ ...{ background: " #01ADFF" } }}>
            <S.BtnImg src={images.save} />
            <S.BtnText style={{ ...{ color: "white" } }}>저장하기</S.BtnText>
          </S.BtnBox>

          <S.BtnBox style={{ ...{ background: "smokewhite" } }}>
            <S.BtnImg src={images.reset} />
            <S.BtnText style={{ ...{ color: "white" } }}>초기화</S.BtnText>
          </S.BtnBox>
        </S.ButtonBoxGrid>
      </S.ButtonBox>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  ResultBox: styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    align-items: center;
    margin-block: 30px;
    box-shadow: 10px 10px 10px #bebfbe;
    padding-bottom: 20px;
    background-color: white;
    @media screen and (max-width: 480px) {
      width: 100vw;
      margin-top: 0px;
    }
  `,
  InTitle: styled.p`
    height: fit-content;
    font-size: 20px;
    font-weight: bold;
  `,
  ResultImgbox: styled.div`
    width: 60vw;
    height: 80vh;
    border-radius: 20px;
    border: 2px solid black;
    background-color: skyblue;
    margin-bottom: 20px;
    box-shadow: 10px 10px 10px #bebfbe;
    @media screen and (max-width: 480px) {
      width: 80vw;
      height: 120vw;
    }
  `,
  ResultImg: styled.img`
    width: 100%;
    height: 100%;
    border-radius: 20px;
  `,
  ResultTextBox: styled.div`
    display: flex;
    flex-direction: column;

    width: 60vw;
    height: 30vh;
    border-radius: 20px;
    border: 2px solid black;
    background-color: white;
    box-shadow: 10px 10px 10px #bebfbe;
    @media screen and (max-width: 480px) {
      width: 80vw;
    }
  `,
  ResultTitle: styled.p`
    padding-inline: 20px;
    /* height: fit-content; */
    font-size: 25px;
    font-weight: bold;
    @media screen and (max-width: 480px) {
      font-size: 20px;
      text-align: center;
    }
  `,
  ResultContext: styled.p`
    padding-inline: 20px;
    font-size: 20px;
    font-weight: 500;
    height: 50%;

    //https://velog.io/@syoung125/CSS-text-overflow-ellipsis-%EB%91%90%EC%A4%84-%EC%9D%B4%EC%83%81-%EC%B2%98%EB%A6%AC
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 4; // 원하는 라인수
    -webkit-box-orient: vertical;

    @media screen and (max-width: 480px) {
      font-size: 15px;
      text-align: center;
    }
  `,
  ResultLink: styled.div`
    cursor: pointer;
    display: flex;
    align-self: center;
    justify-content: center;
    background: #bdbdbd;
    border: 3px solid #000000;
    border-radius: 100px;
    color: #444;
    font-size: 15px;
    font-weight: bold;
    letter-spacing: 2px;
    text-transform: uppercase;
    width: 120px;
    padding: 12px 22px;
    text-align: center;
    margin-bottom: 20px;
    box-shadow: 0px 8px 4px #bebfbe;
    &:hover {
      border: 3px solid #ffffff;
      background-color: rgb(0, 0, 0, 0.5);
      color: rgb(255, 255, 255, 100);
    }
  `,
  //////////

  ButtonBox: styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    margin-bottom: 30px;
    padding-block: 10px;
    box-shadow: 10px 10px 10px #bebfbe;
    background-color: white;
    @media screen and (max-width: 480px) {
      width: 100vw;
      margin-top: 0px;
    }
  `,
  ButtonBoxGrid: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    @media screen and (max-width: 480px) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  `,

  BtnBox: styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    width: 120px;
    padding: 12px 22px;
    background-color: red;
    border-radius: 20px;
    box-shadow: 0px 5px 1px #bebfbe;
    margin-inline: 10px;
    @media screen and (max-width: 480px) {
      margin-inline: 0px;
      margin-block: 10px;
    }
  `,
  BtnImg: styled.img`
    width: 50px;
    margin-right: 10px;
  `,
  BtnText: styled.p`
    font-weight: bold;
    font-size: 15px;
  `,
};
export default Result;
