import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import images from "../assets/images";
import Spinner from "react-activity/dist/Spinner"; // spinner효과를 사용하기 위한 코드
import "react-activity/dist/Spinner.css"; //spinner효과를 사용하기 위한 코드
import * as tmImage from "@teachablemachine/image"; //Teachable Machine을 사용하기 위한 npm
import { FaCheck } from "react-icons/fa"; //아이콘 사용
import ParticlesEffect2 from "../Components/ParticlesEffect2"; //화면 효과 가져오는데 좀더 많은 아이콘이 떠다니도록 저장한 파일

let model;

const Main = () => {
  const [gender, isGender] = useState(); //성별 상태저장
  const [age, isAge] = useState(); //연령대 상태저장
  const [fashion, isFashion] = useState(null); // 옷 스타일 상태 저장

  // https://github.com/leeminq1/politic_test/blob/master/src/pages/Main.js
  // react에서 google teachable machine 사용 사례 적용 ~ 46라인
  const [selectedImage, setSelectedImage] = useState(null); //이미지 선택 저장
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const inputREF = useRef(); //요소 선택 저장

  const imageChange = (e) => {
    // const files = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    };
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setSelectedImage(e.target.files[0]); // 파일 상태 업데이트
      init().then(console.log("init 모델"), predict());
    }
  };

  //구글 티처블 머신 공식 홈페이지 ~85라인
  // https://teachablemachine.withgoogle.com/
  const URL = "https://teachablemachine.withgoogle.com/models/eTFfdq4Mn/";
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  async function init() {
    model = await tmImage.load(modelURL, metadataURL);
    //총 클래스 수
    let maxPredictions;
    maxPredictions = model.getTotalClasses();
  }
  async function predict() {
    model = await tmImage.load(modelURL, metadataURL);
    // model = await tmImage.load(models, metas);
    const tempImage = document.getElementById("srcImg");
    const prediction = await model.predict(tempImage, false);
    //데이터 출력 우선순위 (내림차순 정렬)
    prediction.sort(
      (a, b) => parseFloat(b.probability) - parseFloat(a.probability)
    );
    var resultMessage;
    //데이터 분류
    switch (prediction[0].className) {
      case "dandy":
        resultMessage = "댄디";
        break;
      case "street":
        resultMessage = "스트릿";
        break;
      case "formal":
        resultMessage = "댄디";
        break;
      case "casual":
        resultMessage = "캐주얼";
        break;
    }
    isFashion(resultMessage); // 패션 분류 데이터 저장
  }

  return (
    <S.Container>
      <ParticlesEffect2 />
      <S.GenderBox>
        <S.InTitle>당신의 성별을 선택해 주세요.</S.InTitle>

        <S.GenderImgBox>
          {/* 성별 선택 시 이미지 변경 로직 */}
          {gender != null && gender == "man" ? (
            <S.GenderImg
              src={images.man_after}
              onClick={() => {
                isGender();
              }}
            />
          ) : (
            <S.GenderImg
              src={images.man_before}
              onClick={() => {
                isGender("man");
              }}
            />
          )}

          {gender != null && gender == "woman" ? (
            <S.GenderImg
              src={images.woman_after}
              onClick={() => {
                isGender();
              }}
            />
          ) : (
            <S.GenderImg
              src={images.woman_before}
              onClick={() => {
                isGender("woman");
              }}
            />
          )}
        </S.GenderImgBox>
      </S.GenderBox>

      <S.AgeBox>
        <S.InTitle>당신의 연령대를 선택해 주세요.</S.InTitle>
        {/* 연령대 선택 시 이미지 변경 로직 */}
        <S.AgeBoxGrid>
          <S.AgeImgBox>
            <S.AgeTitle>10대</S.AgeTitle>
            {age != null && age == 10 ? (
              <S.AgeImg
                src={images.mg_10_after}
                onClick={() => {
                  isAge();
                }}
              />
            ) : (
              <S.AgeImg
                src={images.mg_10_before}
                onClick={() => {
                  isAge(10);
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
                }}
              />
            ) : (
              <S.AgeImg
                src={images.mg_20_before}
                onClick={() => {
                  isAge(20);
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
                }}
              />
            ) : (
              <S.AgeImg
                src={images.mg_30_before}
                onClick={() => {
                  isAge(30);
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
                }}
              />
            ) : (
              <S.AgeImg
                src={images.mg_40_before}
                onClick={() => {
                  isAge(40);
                }}
              />
            )}
          </S.AgeImgBox>
        </S.AgeBoxGrid>
      </S.AgeBox>
      <S.FashionBox>
        <S.InTitle>당신의 옷 스타일을 보여주세요.</S.InTitle>
        {/*  https://github.com/leeminq1/politic_test/blob/master/src/pages/Main.js */}
        {/* react에서 google teachable machine 사용 사례 적용 ~ 256라인 */}
        <S.UploadBox
          onClick={() => {
            inputREF.current.click();
          }}
        >
          {/* 이미지 업로드  */}
          <S.InputArea
            ref={inputREF}
            accept="image/*"
            type="file"
            onChange={imageChange}
          />
          {/* 이미지를 저장하는 변수에 값이 저장 되면 해당 이미지 렌더링 , 아닐 경우 이미지를 추가하라는 이미지 렌더링 */}
          {selectedImage ? (
            <>
              <S.UploadAfterImg id="srcImg" src={imgBase64} alt="Thumb" />
              {fashion ? (
                // 패션 데이터 분류가 진행중일 경우에는 spinner와 함께 상황 진행중 표시 아닐경우 분석 완료 테스트 렌더링
                <S.UploadResultBox>
                  <S.UploadResultText>
                    분석완료 <FaCheck color="green" />
                  </S.UploadResultText>
                </S.UploadResultBox>
              ) : (
                <S.UploadResultBox>
                  <S.UploadResultText>분석중...</S.UploadResultText>
                  <Spinner size={10} color="black" />
                </S.UploadResultBox>
              )}
            </>
          ) : (
            <S.UploadBeforeImg src={images.upload} alt="upload" />
          )}
        </S.UploadBox>
      </S.FashionBox>
      {/* 다음페이지를 넘어가기 위해 모든 데이터 입력이 완료되어야 버튼 활성화 */}
      {age != null && gender != null && fashion != null ? (
        <Link
          to="/Result"
          state={{
            Age: age,
            Gender: gender,
            Fashion: fashion,
          }}
          style={{
            textDecoration: "none",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <S.NextpageBtn>next</S.NextpageBtn>
        </Link>
      ) : (
        <S.NextpageBtnNon>next</S.NextpageBtnNon>
      )}
    </S.Container>
  );
};

export default Main;

const S = {
  //전체화면
  Container: styled.div`
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  GenderBox: styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    height: fit-content;
    margin-block: 30px;
    background-color: white;
    box-shadow: 10px 10px 10px #bebfbe;
    padding-bottom: 20px;
    @media screen and (max-width: 480px) {
      width: 100vw;
      margin-top: 0px;
    }
  `,
  InTitle: styled.p`
    padding-inline: 20px;
    height: fit-content;
    font-size: 20px;
    font-weight: bold;
    @media screen and (max-width: 480px) {
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
    @media screen and (max-width: 480px) {
      width: 100px;
    }
    -webkit-tap-highlight-color: transparent; //모바일 하이라이트 방지
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
    @media screen and (max-width: 480px) {
      width: 100vw;
    }
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
    -webkit-tap-highlight-color: transparent; //모바일 하이라이트 방지
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
    @media screen and (max-width: 480px) {
      width: 100px;
    }
  `,
  ////////////////
  FashionBox: styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    margin-block: 30px;
    padding-bottom: 50px;
    background-color: white;
    box-shadow: 10px 10px 10px #bebfbe;
    @media screen and (max-width: 480px) {
      width: 100vw;
    }
  `,
  UploadBox: styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    align-self: center;
    box-shadow: 0px 0px 10px #bebfbe;
    width: 30vw;
    @media screen and (max-width: 480px) {
      width: 80vw;
      min-height: 120vw;
    }
  `,
  InputArea: styled.input`
    width: 100%;
    height: 100%;
    display: none;
  `,
  UploadBeforeImg: styled.img`
    display: flex;
    flex: 1;
  `,
  UploadAfterImg: styled.img`
    width: 100%;
    height: 100%;
    resize: cover;
    align-self: center;
  `,
  UploadResultBox: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  `,
  UploadResultText: styled.p`
    font-size: 20px;
    font-weight: bold;
  `,

  /////////////////
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
    text-align: center;
    &:hover {
      border: 3px solid #ffffff;
      background-color: rgb(0, 0, 0, 0.5);
      color: rgb(255, 255, 255, 100);
    }
    margin-bottom: 20px;
  `,

  NextpageBtnNon: styled.div`
    background: #a7a7a8;
    opacity: 0.5;
    /* border: 3px solid #000000; */
    border-radius: 100px;
    color: #444;
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 2px;
    text-transform: uppercase;
    width: 120px;
    padding: 12px 22px;
    text-align: center;
    margin-bottom: 20px;
    pointer-events: none;
    -webkit-tap-highlight-color: transparent;
  `,
};
