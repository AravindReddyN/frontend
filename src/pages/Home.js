import React, { useState } from 'react';
import axios from 'axios';
// import './home.css'

function Home() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [target, setTarget] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0])); // Create URL for the selected image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1];

        const requestData = {
          image: base64data,
          name: image.name || 'default_filename.jpg',
        };

        try {
          const response = await axios.post(
            '${process.env.REACT_APP_flaskurl}/predict',
            requestData,
            {
              withCredentials: true,
            }
          );

          setPrediction(response.data.prediction);
          setTarget(response.data.target);
          console.log('Response from server:', response);
        } catch (error) {
          console.error('Error:', error);
        }
      };

      reader.readAsDataURL(image);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='homeform'>
        <label htmlFor="image">Upload image</label>
        <input type="file" id="image" onChange={handleImageChange}></input>
        <button type="submit">Submit</button>
      </form>

      {imageUrl && (
        <div className="image-preview">
          <h2>Input Image</h2>
          <img src={imageUrl} alt="Input" style={{ maxWidth: '100%', maxHeight: '300px' }} />
        </div>
      )}

      {prediction ? (
        <div className="output">
          <h2>Prediction</h2>
          <span>
          {prediction}
          </span>
          
          <h2>Target</h2>
          <span>
          {target}
          </span>
          
        </div>
      ) : null}
    </div>
  );
}

export default Home;
