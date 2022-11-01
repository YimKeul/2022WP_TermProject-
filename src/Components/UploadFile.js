import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import images from "../assets/images";

const UploadFile = () => {
  const [selectedImage, setSelectedImage] = useState();

  const inputREF = useRef();

  const imageChange = (e) => {
    const files = e.target.files[0];
    setSelectedImage(files);
  };

  const removeSelectedImage = () => {
    window.location.replace("/Main");
    // setSelectedImage(null);
  };

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
            <S.image src={URL.createObjectURL(selectedImage)} alt="Thumb" />
            {console.log(selectedImage)}
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
