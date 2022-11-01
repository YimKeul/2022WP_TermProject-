import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import images from "../assets/images";
import UploadFile from "../Components/UploadFile";
import ParticlesEffect2 from "../Components/ParticlesEffect2";

const Main = () => {
  const [gender, isGender] = useState();
  const [age, isAge] = useState();
  return (
    <S.Container>
      <ParticlesEffect2 />
      <S.GenderBox>
        <S.InTitle>당신의 성별을 선택해 주세요.</S.InTitle>
        <S.GenderImgBox>
          {gender != null && gender == "Man" ? (
            <S.GenderImg
              src={images.man_after}
              onClick={() => {
                isGender();
                console.log(gender);
              }}
            />
          ) : (
            <S.GenderImg
              src={images.man_before}
              onClick={() => {
                isGender("Man");
                console.log(gender);
              }}
            />
          )}

          {gender != null && gender == "Woman" ? (
            <S.GenderImg
              src={images.woman_after}
              onClick={() => {
                isGender();
                console.log(gender);
              }}
            />
          ) : (
            <S.GenderImg
              src={images.woman_before}
              onClick={() => {
                isGender("Woman");
                console.log(gender);
              }}
            />
          )}
        </S.GenderImgBox>
      </S.GenderBox>

      <S.AgeBox>
        <S.InTitle>당신의 연령대를 선택해 주세요.</S.InTitle>
        <S.AgeBoxGrid>
          <S.AgeImgBox>
            <S.AgeTitle>10대</S.AgeTitle>
            {age != null && age == 10 ? (
              <S.AgeImg
                src={images.mg_10_after}
                onClick={() => {
                  isAge();
                  console.log(age);
                }}
                // style={{ ...{ borderColor: "black" } }}
              />
            ) : (
              <S.AgeImg
                src={images.mg_10_before}
                onClick={() => {
                  isAge(10);
                  console.log(age);
                }}
              />
            )}
          </S.AgeImgBox>
          <S.AgeImgBox>
            <S.AgeTitle>20대</S.AgeTitle>
            {age != null && age == 20 ? (
              <S.AgeImg
                src={images.mg_20_after}
                onClick={() => {
                  isAge();
                  console.log(age);
                }}
              />
            ) : (
              <S.AgeImg
                src={images.mg_20_before}
                onClick={() => {
                  isAge(20);
                  console.log(age);
                }}
              />
            )}
          </S.AgeImgBox>
        </S.AgeBoxGrid>
        <S.AgeBoxGrid>
          <S.AgeImgBox>
            <S.AgeTitle>30대</S.AgeTitle>
            {age != null && age == 30 ? (
              <S.AgeImg
                src={images.mg_30_after}
                onClick={() => {
                  isAge();
                  console.log(age);
                }}
              />
            ) : (
              <S.AgeImg
                src={images.mg_30_before}
                onClick={() => {
                  isAge(30);
                  console.log(age);
                }}
              />
            )}
          </S.AgeImgBox>
          <S.AgeImgBox>
            <S.AgeTitle>40대</S.AgeTitle>
            {age != null && age == 40 ? (
              <S.AgeImg
                src={images.mg_40_after}
                onClick={() => {
                  isAge();
                  console.log(age);
                }}
              />
            ) : (
              <S.AgeImg
                src={images.mg_40_before}
                onClick={() => {
                  isAge(40);
                  console.log(age);
                }}
              />
            )}
          </S.AgeImgBox>
        </S.AgeBoxGrid>
      </S.AgeBox>
      <S.FashionBox>
        <S.InTitle>당신의 옷 스타일을 보여주세요.</S.InTitle>
        <UploadFile />
      </S.FashionBox>
    </S.Container>
  );
};

export default Main;

const S = {
  //전체화면
  Container: styled.div`
    /* width: 100vw;
    height: 100vh; */
    background-color: #f5f5f5;
    /* background-color: #bebfbe; */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
  `,
  GenderBox: styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    height: fit-content;
    margin-block: 30px;
    background-color: white;
    box-shadow: 10px 10px 10px #bebfbe;
  `,
  InTitle: styled.p`
    padding-inline: 20px;
    height: fit-content;
    font-size: 20px;
    font-weight: bold;
    @media screen and (max-width: 400px) {
      text-align: center;
    }
  `,
  GenderImgBox: styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  `,
  GenderImg: styled.img`
    cursor: pointer;
    width: 200px;
    @media screen and (max-width: 400px) {
      width: 100px;
    }
  `,
  /////////////////////////////////

  AgeBox: styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    height: fit-content;
    margin-block: 30px;
    background-color: white;
    box-shadow: 10px 10px 10px #bebfbe;
  `,
  AgeBoxGrid: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin-bottom: 20px;
    /* background-color: blue; */
  `,
  AgeImgBox: styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    /* justify-content: center; */
  `,
  AgeTitle: styled.p`
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  `,
  AgeImg: styled.img`
    width: 200px;
    border: 2px solid;
    border-color: transparent;
    @media screen and (max-width: 400px) {
      width: 100px;
    }
  `,

  FashionBox: styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    height: fit-content;
    margin-block: 30px;
    background-color: white;
    box-shadow: 10px 10px 10px #bebfbe;
    padding-bottom: 50px;
  `,
};
