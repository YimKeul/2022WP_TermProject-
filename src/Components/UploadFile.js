import React, { useState, useEffect, useRef } from "react";
import * as tmImage from "@teachablemachine/image";
import styled from "styled-components";
import images from "../assets/images";

let model;

const UploadFile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [result, isResult] = useState(null);

  const inputREF = useRef();

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

    // setSelectedImage(files);
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setSelectedImage(e.target.files[0]); // 파일 상태 업데이트
      init().then(console.log("init 모델"), predict());
    }
  };

  const removeSelectedImage = () => {
    window.location.replace("/Main");
    // setSelectedImage(null);
  };

  const URL = "https://teachablemachine.withgoogle.com/models/eTFfdq4Mn/";
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  async function init() {
    model = await tmImage.load(modelURL, metadataURL);
    // model = await tmImage.load(models, metas);
    //총 클래스 수
    let maxPredictions;
    maxPredictions = model.getTotalClasses();
  }
  async function predict() {
    model = await tmImage.load(modelURL, metadataURL);
    // model = await tmImage.load(models, metas);
    const tempImage = document.getElementById("srcImg");
    const prediction = await model.predict(tempImage, false);
    prediction.sort(
      (a, b) => parseFloat(b.probability) - parseFloat(a.probability)
    );
    var resultMessage;

    switch (prediction[0].className) {
      case "dandy":
        resultMessage = "댄디";
        break;
      case "street":
        resultMessage = "스트릿";
        break;
      case "formal":
        resultMessage = "포멀";
        break;
      case "casual":
        resultMessage = "캐주얼";
        break;
    }
    isResult(resultMessage);
  }
  return (
    <S.container>
      <S.inputContainer
        onClick={() => {
          inputREF.current.click();
        }}
      >
        <S.input
          ref={inputREF}
          accept="image/*"
          type="file"
          onChange={imageChange}
        />
        {selectedImage ? (
          <>
            <S.image
              id="srcImg"
              // src={URL.createObjectURL(selectedImage)}
              src={imgBase64}
              alt="Thumb"
            />
            <S.delete onClick={removeSelectedImage}>Remove This Image</S.delete>
          </>
        ) : // <button>click</button>
        null}
      </S.inputContainer>
    </S.container>
  );
};

export default UploadFile;

const S = {
  container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 50px;
    width: 80vw;
    height: 100%;
    background-color: white;
  `,
  preview: styled.div`
    width: 200px;
    background-color: blue;
  `,

  image: styled.img`
    width: 50vw;
    height: 500px;
    resize: contain;
  `,
  delete: styled.button`
    cursor: pointer;
    padding: 15px;
    background-color: red;
    color: white;
    border: none;
  `,
  inputContainer: styled.div`
    width: 50vw;
    height: 500px;
    background-color: grey;
  `,
  input: styled.input`
    width: 50vw;
    height: 500px;
    background-color: pink;
    display: none;
  `,
};
