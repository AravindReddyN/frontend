import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import defaultImage from "../images/lung.jpg";
import bg from "../images/dashboard.jpg";
import loadingIcon from "../images/loading.gif";

function Home() {
    const [imgFile, setImgFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [xrayImage, setXrayImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [target, setTarget] = useState("");
  const [b1, setb1] = useState(0);
  const [b2, setb2] = useState(0);
  const [b3, setb3] = useState(0);
  const [b4, setb4] = useState(0);
  const [cos, setcos] = useState(0);

  const fileSelectHandler = (event) => {
    const file = event.target.files[0];
    setImgFile(file);
    setXrayImage(URL.createObjectURL(file));
    setResponseMessage("Generated Report");
    setTarget("");
  };

  const fileUploadHandler = async () => {
    if (imgFile) {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", imgFile);
      formData.append("filename", imgFile.name);
      console.log(imgFile.name);

      try {
        const response = await fetch(
          "https://barely-ruling-whale.ngrok-free.app/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          const data = await response.json();
          const predictedValue = data["Predicted"];
          const fileName = data["Filename"];
          const targetValue = data["Caption"];
          const tb1 = data["b1"];
          const tb2 = data["b2"];
          const tb3 = data["b3"];
          const tb4 = data["b4"];
          const tcos = data["cos"];
          setTarget(targetValue);
          console.log(target);
          setResponseMessage(predictedValue);
          setb1(tb1);
          setb2(tb2);
          setb3(tb3);
          setb4(tb4);
          setcos(tcos);
          console.log(b1);
          console.log(b2);
          console.log(b3);
          console.log(b4);
          console.log(tcos);
        } else {
          console.error("Image upload failed.");
        }
      } catch (error) {
        console.error("Error during image upload:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("No file selected.");
    }
  };

  const clearHandler = () => {
    setImgFile(null);
    setXrayImage(defaultImage);
    setResponseMessage("Generated Text");
    setTarget("");
  };

  return (
    <div id="img-container4">
      <img src={bg} alt="background" />
      <div id="img-overlay4"></div>
      <div id="dashboard-container">
        <div id="pred">
          <div id="xray">
            <img
              src={xrayImage}
              alt="X-ray Image"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <div id="output">
            {loading ? (
              <img src={loadingIcon} alt="Loading" id="loader" />
            ) : (
              <div className="output-text">{responseMessage}</div>
            )}
          </div>
        </div>

        <div id="gen-buttons">
          <label htmlFor="imginp" className="custom-file-input">
            Choose File
          </label>
          <input
            type="file"
            id="imginp"
            onChange={fileSelectHandler}
            className="gen1"
          ></input>
          <button onClick={fileUploadHandler} id="b1" className="gen2">
            Generate
          </button>
          <button onClick={clearHandler} id="b2" className="gen3">
            Clear
          </button>
        </div>
        {target && (
          <div id="output2">
            {/* Display the 'target' value in this container */}
            Target: {target}
          </div>
        )}


        {target && (
          <div id="scores">
          <p id="bl1">Bleu 1:&nbsp; </p> {b1} &emsp; <p id="bl2">Bleu 2: &nbsp; </p> {b2}&emsp;   <p id="bl3">Bleu 3:&nbsp;  </p> {b3}&emsp;   <p id="bl4">Bleu 4:&nbsp;  </p> {b4}&emsp;   <p id="cos">Cosine Similarity:&nbsp;  </p> {cos}
          </div>
        )}

      </div>
    </div>
  );
    // const [imgFile, setImgFile] = useState(null);
    // const [responseMessage, setResponseMessage] = useState("-----");
    // const [imageUrl, setImageUrl] = useState(null);
    // const [prediction, setPrediction] = useState(null);
    // const [target, setTarget] = useState(null);
    // const [b1, setB1] = useState(0);
    // const [b2, setB2] = useState(0);
    // const [b3, setB3] = useState(0);
    // const [b4, setB4] = useState(0);
    // const [cos, setCos] = useState(0);

    // const fileSelectHandler = (event) => {
    //     setImgFile(event.target.files[0]);
    //     setImageUrl(URL.createObjectURL(event.target.files[0]));
    //     setPrediction("Generated Report");
    //     setTarget("");
    // };

    // const fileUploadHandler = async () => {
    //     if (imgFile) {
    //         const formData = new FormData();
    //         formData.append("image", imgFile);

    //         try {
    //             const response = await fetch("https://barely-ruling-whale.ngrok-free.app/upload", {
    //                 method: "POST",
    //                 body: formData,
    //             });

    //             if (response.ok) {
    //                 console.log("Image uploaded successfully!");
    //                 const data = await response.json();
    //                 const predictedValue = data["Predicted"];
    //                 const targetValue = data["Caption"];
    //                 const tb1 = data["b1"];
    //                 const tb2 = data["b2"];
    //                 const tb3 = data["b3"];
    //                 const tb4 = data["b4"];
    //                 const tcos = data["cos"];
    //                 setPrediction(predictedValue);
    //                 setTarget(targetValue);
    //                 setB1(tb1);
    //                 setB2(tb2);
    //                 setB3(tb3);
    //                 setB4(tb4);
    //                 setCos(tcos);
    //             } else {
    //                 console.error("Image upload failed.");
    //             }
    //         } catch (error) {
    //             console.error("Error during image upload:", error);
    //         }
    //     } else {
    //         console.log('No file selected.');
    //     }
    // };

    // return (
    //     <div style={{ textAlign: 'center' }}>
    //         <div style={{ marginTop: '20px' }}>
    //             {imageUrl && <img src={imageUrl} alt='Selected Image' style={{ width: '300px', height: '300px', border: '1px solid black', borderRadius: '5px' }} />}
    //         </div>

    //         <h1>Upload Image</h1>
    //         <form onSubmit={fileUploadHandler} style={{ display: 'inline-block', textAlign: 'left' }}>
    //             <label htmlFor='image'>Upload image</label>
    //             <input type='file' id="image" onChange={fileSelectHandler}></input>
    //             <button type="submit">Submit</button>
    //         </form>
    //         <div style={{ display: 'flex', justifyContent: 'center' }}>
    //             <div className='output' style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '40%', height: 'auto' }}>
    //                 <p>target</p>
    //                 {target}
    //             </div>
    //             <div className='output' style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '40%', marginLeft: '5%', height: 'auto' }}>
    //                 <p>{prediction}</p>
    //             </div>
    //         </div>
    //     </div>
    // );
}

export default Home;
