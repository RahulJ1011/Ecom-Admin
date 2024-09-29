import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../../store/store'; // Adjust the import path as needed
import { storage } from '../config'; // Assuming you have Firebase storage configured
import { getDownloadURL, ref as storageRef, listAll, uploadBytes } from 'firebase/storage';
import upload from './assets/upload.jpg';
import './product.css';

const Products = () => {
 /*  const { token, userId, id } = useAuthStore((state) => ({
    token: state.token,
    userId: state.userId,
    id: state.id,
  })); */
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [photos, setPhotos] = useState({
    Photo1: null,
    Photo2: null,
    Photo3: null,
    Photo4: null,
  });

  const photoRefs = {
    Photo1: useRef(null),
    Photo2: useRef(null),
    Photo3: useRef(null),
    Photo4: useRef(null),
  };

  const [Data, setData] = useState({
    userId: userId,
    id: id,
    Photo1: '',
    Photo2: '',
    Photo3: '',
    Photo4: '',
    Description: '',
    PrevPrice: '',
    Price: '',
    Stock: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(token); // Check if token is defined

    try {
      const res = await axios.post(
        'http://localhost:7000/api/Prod/addProd',
        Data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/Myproducts');
      console.log(res);
    } catch (error) {
      console.error('Error while submitting product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e, photoKey) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotos((prev) => ({
        ...prev,
        [photoKey]: file,
      }));
      uploadFile(file, photoKey);
    }
  };

  const uploadFile = (file, photoKey) => {
    const PostId = Date.now().toString();
    const imageRef = storageRef(storage, `post/${PostId}`);
    const imageListRef = storageRef(storage, 'post/');

    if (file === null) {
      return;
    }

    uploadBytes(imageRef, file).then(() => {
      alert('Uploaded');
      listAll(imageListRef).then((res) => {
        res.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            if (item.name === PostId) {
              setData((prevData) => ({
                ...prevData,
                [photoKey]: url,
              }));
            }
          });
        });
      });
    });
  };

  const handleClick = (photoKey) => {
    photoRefs[photoKey].current.click();
  };

  return (
    <div className='product-container'>
      <form onSubmit={handleSubmit}>
        <div className='photos'>
          {['Photo1', 'Photo2', 'Photo3', 'Photo4'].map((photoKey) => (
            <div key={photoKey} className='media'>
              <label className='photo-label'>{photoKey}</label>
              <div className='image-container'>
                <img
                  src={Data[photoKey] || upload}
                  height={200}
                  width={200}
                  alt={`Upload ${photoKey}`}
                />
                <input
                  ref={photoRefs[photoKey]}
                  type='file'
                  required
                  style={{ display: 'none' }}
                  placeholder={`Upload ${photoKey}`}
                  onChange={(e) => handleFileChange(e, photoKey)}
                />
                <button
                  type='button'
                  className='upload-button'
                  onClick={() => handleClick(photoKey)}
                >
                  Upload {photoKey}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='text'>
          <input
            type='text'
            name='Description'
            required
            placeholder='Add Description'
            value={Data.Description}
            onChange={handleChange}
          />
          <input
            type='text'
            required
            name='Price'
            placeholder='Add Price'
            value={Data.Price}
            onChange={handleChange}
          />
          <input
            type='text'
            name='PrevPrice'
            required
            placeholder='Add PrevPrice'
            value={Data.PrevPrice}
            onChange={handleChange}
          />
          <input
            type='text'
            required
            name='Stock'
            placeholder='Add No.of Stocks'
            value={Data.Stock}
            onChange={handleChange}
          />
          <button type='submit' className='submit-button'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Products;
