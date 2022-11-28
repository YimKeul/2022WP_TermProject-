import React, { useEffect, useState, createRef, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import images from "../assets/images";
import { useLocation } from "react-router-dom"; // 이전화면에서 전달한 데이터 받아오기
import { useScreenshot, createFileName } from "use-react-screenshot";
import { perfume } from "../DB"; // 직접 작성한 jsos 파일 가져오기

// const { Kakao } = window;

const Result = () => {
  const location = useLocation(); // 이전화면에서 전달한 데이터 받아오기
  const D_age = location.state.Age; // 나이 전달
  const D_gender = location.state.Gender; //성별 전달
  const D_fashion = location.state.Fashion; //성별 전달
  const Database = perfume; // 직접 작성한 jsos 파일 가져오기

  // https://stackoverflow.com/questions/71190946/created-image-with-use-react-screenshot-is-incorrectly-rendered
  // 결과 화면 스크린샷 ~30라인
  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });
  //image를 파일 이름과 형식을 저장
  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    console.log("asdf");
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    // a.click();
  };
  //최근 선택한 요소 다운
  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);
  ///
  // const preventClose = (e) => {
  //   e.preventDefault();
  //   e.returnValue = "";
  // };

  //데이터 필터링 나이,연령대,스타일이 맞는 경우에 newDB에 저장
  const newDB = Database.filter((data) => {
    if (data.age == D_age && data.sex == D_gender && data.style == D_fashion) {
      return data;
    }
  });

  // 이전 화면에서 조건에 맞는 데이터들 중 랜덤하게 하나 뽑기 위한 로직
  const randomindex = Math.floor(Math.random() * (newDB.length - 0));
  var ShowData = newDB[randomindex];

  //배포후
  // const url = "https://wearscent.netlify.app/";
  //배포전
  const url = "http://localhost:3000";
  const resultUrl = window.location.href;

  useEffect(() => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init("1bb3f384d3095bbb06e000935b2ca45f");
      }
    }
    // window.addEventListener("beforeunload", preventClose);
    // return () => {
    //   window.removeEventListener("beforeunload", preventClose);
    // };
    // Kakao.init("1bb3f384d3095bbb06e000935b2ca45f");
  }, []);
  const shareKakao = () => {
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "🎁 향수 추천 결과",
        description: `당신에게 ${ShowData.title}을(를) 추천합니다.`,
        imageUrl: url + ShowData.img_link,
        link: {
          mobileWebUrl: resultUrl,
          webUrl: resultUrl,
        },
      },
      buttons: [
        {
          title: "나도 테스트하러가기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  //로그 확인용
  console.log(ShowData);

  return (
    <S.Container>
      <S.ResultBox ref={ref}>
        {/* 스크린샷 범위 지정 ref */}
        <S.InTitle>당신에게 어울리는 향수는...</S.InTitle>
        <S.ResultImgbox>
          <S.ResultImg src={ShowData.img_link} alt="" />
          {/* 결과 이미지 화면*/}
        </S.ResultImgbox>
        <S.ResultTextBox>
          <S.ResultTitle>{ShowData.title}</S.ResultTitle>
          <S.ResultContext>{ShowData.explain}</S.ResultContext>
          <S.ResultLink
            onClick={() => window.open(`${ShowData.link}`, "_blank")}
          >
            상품 보기
          </S.ResultLink>
        </S.ResultTextBox>
      </S.ResultBox>

      <S.ButtonBox>
        <S.ButtonBoxGrid>
          {/* 카카오톡 공유하기는 배포가 된 이후에 적용 가능하므로 버튼만 구성 */}
          <S.BtnBox
            onClick={shareKakao}
            style={{ ...{ background: " #fef01b" } }}
          >
            <S.BtnImg src={images.kakao} />
            <S.BtnText>공유하기</S.BtnText>
          </S.BtnBox>

          {/* 스크린샷 저장버튼 */}
          {/* <S.BtnBox
            style={{ ...{ background: " #01ADFF" } }}
            onClick={downloadScreenshot}
          >
            <S.BtnImg src={images.save} />
            <S.BtnText style={{ ...{ color: "white" } }}>저장하기</S.BtnText>
          </S.BtnBox> */}
          {/* 초기화 버튼 : 홈화면으로 이동함 */}
          <Link
            to="/"
            style={{
              textDecoration: "none",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <S.BtnBox style={{ ...{ background: "smokewhite" } }}>
              <S.BtnImg src={images.reset} />
              <S.BtnText style={{ ...{ color: "white" } }}>초기화</S.BtnText>
            </S.BtnBox>
          </Link>
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
    font-size: 40px;
    font-weight: bold;
    text-align: center;
    @media screen and (max-width: 480px) {
      font-size: 30px;
    }
  `,
  ResultImgbox: styled.div`
    width: 30vw;
    height: 40vh;
    padding: 20px;
    border-radius: 20px;
    border: 2px solid black;
    margin-bottom: 20px;
    box-shadow: 10px 10px 10px #bebfbe;
    @media screen and (max-width: 480px) {
      width: 30vh;
      height: 40vh;
    }
  `,
  ResultImg: styled.img`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    z-index: 10;
  `,
  ResultTextBox: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30vw;
    padding: 20px;
    /* height: 30vh; */
    border-radius: 20px;
    border: 2px solid black;
    background-color: white;
    box-shadow: 10px 10px 10px #bebfbe;
    @media screen and (max-width: 480px) {
      width: 30vh;
    }
  `,
  ResultTitle: styled.p`
    font-size: 25px;
    font-weight: bold;
    margin-block: 20px;
    align-self: flex-start;
    @media screen and (max-width: 480px) {
      font-size: 20px;
    }
  `,
  ResultContext: styled.p`
    font-size: 20px;
    font-weight: 500;
    align-self: flex-start;
    //https://velog.io/@syoung125/CSS-text-overflow-ellipsis-%EB%91%90%EC%A4%84-%EC%9D%B4%EC%83%81-%EC%B2%98%EB%A6%AC
    // p태그의 글자수 라인 제한하기
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 10; // 원하는 라인수
    -webkit-box-orient: vertical;

    @media screen and (max-width: 480px) {
      font-size: 15px;
    }
  `,
  ResultLink: styled.div`
    cursor: pointer;
    display: flex;
    align-self: center;
    justify-content: center;
    background: white;
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
    margin-block: 20px;
    box-shadow: 0px 8px 4px #bebfbe;
    &:hover {
      border: 3px solid #ffffff;
      background-color: rgb(0, 0, 0, 0.5);
      color: rgb(255, 255, 255, 100);
    }
    -webkit-tap-highlight-color: transparent;
  `,
  //////////

  ButtonBox: styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    padding-top: 10px;
    padding-bottom: 30px;
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
    -webkit-tap-highlight-color: transparent;
  `,
  BtnImg: styled.img`
    width: 50px;
    margin-right: 10px;
    -webkit-tap-highlight-color: transparent;
  `,
  BtnText: styled.p`
    font-weight: bold;
    font-size: 15px;
  `,
};
export default Result;
