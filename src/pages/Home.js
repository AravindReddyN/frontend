import React, { useState } from 'react'
// import { toast } from 'react-hot-toast'
import './Home.css'
import axios from 'axios'


function Home() {
    const [imgFile, setImgFile] = useState(null);
    const [responseMessage,setResponseMessage] = useState("-----")
    const[imageURL,setImageURL] = useState(null);
    const fileSelectHandler = (event) => {
        setImgFile(event.target.files[0]);
        setImageURL(URL.createObjectURL(event.target.files[0]));
    };
    const fileUploadHandler = async () => {
        if (imgFile) {
        const formData = new FormData();
        formData.append("image", imgFile);

        try {
            const response = await fetch("https://barely-ruling-whale.ngrok-free.app/upload", {
            method: "POST",
            body: formData,
            });

            if (response.ok) {
            console.log("Image uploaded successfully!");
            const data = await response.text();
            setResponseMessage(data)
            } else {
            console.error("Image upload failed.");
            }
        } catch (error) {
            console.error("Error during image upload:", error);
        }
        }
        else {
        console.log('No file selected.');
    }
    };

    return (
        <div class="container">
        <h1>Upload Image</h1>
        <input type="file" onChange={fileSelectHandler}></input>
        <button onClick={fileUploadHandler}>Generate</button>
        {imageURL && (
        <div>
          <h2>Selected Image Preview</h2>
          <img src={imageURL} alt="Selected" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
        )}
        <h2>Output: {responseMessage}</h2>
        
        </div>
    );
    // const [image, setImage] = useState(null);
    // const [prediction, setPrediction] = useState(null);
    // const [target, setTarget] = useState(null);

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];

    //     setImage(file);
    // };

    // const handlesubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             const base64data = reader.result.split(',')[1];

    //             const requestData = {
    //                 image: base64data,
    //                 name: image.name || 'default_filename.jpg',
    //             };


    //             axios.post("https://test-report-3qti.onrender.com/predict",requestData, {
    //                 withCredentials: true,
    //             })
    //                 .then((response) => {
    //                     const result = response;
                        
    //                     console.log(Object.keys(result))
                        
    //                     setPrediction(result["data"]["prediction"])
    //                     setTarget(result["data"]["target"])
    //                     console.log('Response from server:', result);
    //                 })
    //                 .catch((error) => {
    //                     console.error('Error:', error);
    //                 });
    //         };

    //         reader.readAsDataURL(image);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // return (
    //     <div>
    //         <form onSubmit={handlesubmit}>
    //             <label htmlFor='image'>Upload image</label>
    //             <input type='file' id="image" onChange={handleImageChange}></input>
    //             <button type="submit">Submit</button>
    //         </form>

    //         {prediction ? (
    //             <div className='output'>
                    
    //                 <h2>prediction</h2>
    //                 {prediction}
    //                 <h2>target</h2>
    //                 {target}
    //             </div>
    //         ) : null}

    //     </div>



    // )
}

export default Home
