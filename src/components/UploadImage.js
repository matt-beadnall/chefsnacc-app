import React, {useRef, useState} from "react";

import axios from "axios";

const FormData = require("form-data");

export default function UploadImage({
  recipeName,
  recipeId,
  recipeDescription,
}) {
  const [uploadFile, setUploadFile] = useState(undefined);

  const divEl = useRef();

  const submitForm = (event) => {
    event.preventDefault();
    let dataArray = new FormData();

    dataArray.append("uploadFile", uploadFile);
    const formData = new FormData();
    formData.append("recipeName", uploadFile.recipeName);
    formData.append("recipeId", uploadFile.recipeId);
    formData.append("recipeDescription", uploadFile.recipeDescription);
    // split out height and width as just wasn't working in express server
    formData.append("height", uploadFile.dimensions.height);
    formData.append("width", uploadFile.dimensions.width);
    formData.append("uploadFile", uploadFile.file);

    // console.log(uploadFile)

    axios({
      method: "post",
      url: `http://${process.env.REACT_APP_BACKEND_SERVER}/chefsnacc/ingredients/gallery`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      // headers: formData.getHeaders(),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("oh drat");
      });
      // alert("Image Saved!");
      //reset state:
      setUploadFile(undefined);
  };

  /**
   * Function called when a user selects an image to be uploaded. We record the dimensions of the image
   * for later use. 
   */
  const updateImage = (e) => {

    let image = new Image();
    image.onload = function () {
      URL.revokeObjectURL(image.src);

      const picture = {
        recipeName: recipeName,
        recipeDescription: recipeDescription,
        recipeId: recipeId,
        dimensions: {width: image.width, height: image.height}, 
        file: e.target.files[0]
      }
      setUploadFile(picture);
      console.log(picture);
    };
    image.src = URL.createObjectURL(e.target.files[0]);
    // divEl.current.replaceChildren(image);
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <br />
        <input type="file" onChange={updateImage} />
        <br />
        <input type="submit" value="Save" disabled={uploadFile === undefined}
/>
      </form>
      {/* {previewImage === undefined ?   null : previewImage} */}
      <div ref={divEl}></div>
      {/* <img src={URL.createObjectURL(uploadFile[0])}></img> */}
    </div>
  );

  // return (
  //   <div>
  //     <div>
  //       <form
  //         action="http://localhost:4000/chefsnacc/ingredients/gallery"
  //         method="POST"
  //         encType="multipart/form-data"
  //       >
  //         <div>
  //           <input type="hidden" id="recipeName" name="recipeName" value={recipeName}></input>
  //           <input type="hidden" id="recipeId" name="recipeId" value={recipeId}></input>
  //           <input type="hidden" id="recipeDescription" name="recipeDescription" value={recipeDescription}></input>
  //           <input
  //             type="file"
  //             id="image"
  //             class="custom-file-input"
  //             name="image"
  //             onChange="readSingleFile(this.files)"
  //             required
  //           ></input>
  //         </div>
  //         <div>
  //           <button type="submit">Submit</button>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // );
}
