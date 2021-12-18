import Carousel, { Modal, ModalGateway } from "react-images";
import React, { useCallback, useEffect, useState } from "react";

import Gallery from "react-photo-gallery";
import GridLoader from "react-spinners/GridLoader";
import axios from "axios";
import { css } from "@emotion/react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const override = css`
   position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%);
  ${'' /* transform: translateX(-50%); */}
  ${'' /* transform: translateX(-50%); */}
`;

export default function DisplayImage({ currentPageId }) {
  const [pictures, setPictures] = useState([]);

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const GalleryContainer = styled.div`
    width: 100%;
    animation: fadeInAnimation ease 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    @keyframes fadeInAnimation {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `;

  //spinner
  // eslint-disable-next-line
  let [loading, setLoading] = useState(true);

  const { id } = useParams();

  // useCallback memoizes the function
  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  useEffect(() => {
    axios
      .get(
        `http://chefsnaccbackend-env.eba-unycwpym.eu-west-2.elasticbeanstalk.com/chefsnacc/ingredients/gallery`
      )
      .then((res) => {
        let pictureArray = [];
        res.data
          .filter((picture) => id === undefined || picture.recipeId === id)
          .forEach((picture) => {
            var imageBase64 = new Image();
            // Adding the image to an image object will calculate the dimensions.
            imageBase64.src = `data:${
              picture.img.contentType
            };base64,${Buffer.from(picture.img.data.data).toString("base64")}`;
            // but then we still want it as an object
            const ratio = reduceRatio(picture.width, picture.height);
            const newPicObject = {
              src: imageBase64.src,
              width: ratio.width,
              height: ratio.height,
            };
            // console.log(res.data);
            pictureArray.push(newPicObject);
          });
        setPictures(pictures.concat(pictureArray));
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line
  }, []);

  const reduceRatio = (width, height) => {
    const denominator = width < height || width === height ? width : height;
    return {
      width: width / denominator,
      height: height / denominator,
    };
  };

  return (
    <div>
      {console.log(pictures.length === 0)}
      {pictures.length === 0 ? (
        <GridLoader
          color={"#ededed"}
          loading={loading}
          css={override}
          size={30}
        />
      ) : (
        <GalleryContainer>
          <Gallery photos={pictures} onClick={openLightbox} />
        </GalleryContainer>
      )}
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={pictures.map((x) => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
}
