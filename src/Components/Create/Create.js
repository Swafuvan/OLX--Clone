import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseConstent, AuthContext } from '../../store/Context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const Create = () => {

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [nameError, setNameError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [imageErr, setImageErr] = useState('')
  const { firebase } = useContext(FirebaseConstent);
  const { user } = useContext(AuthContext);
  const date = new Date();
  const history = useHistory()

  const handleSubmit = () => {

    setNameError('');
    setCategoryError('');
    setPriceError('');

    if (!name.trim()) {
      setNameError('Name is required');
      return false;
    }
    if (!category.trim()) {
      setCategoryError('Category is required');
      return false;
    }
    if (!price.trim()) {
      setPriceError('Price is required');
      return false;
    } else if (price <= 0) {
      setPriceError('Price must be greater than 0');
      return false;
    }

    if (!image) {
      setImageErr('Must be Add a Image');
      return false;
    }

    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ ref }) => {
      ref.getDownloadURL().then((url) => {
        console.log(url);
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId: user.uid,
          createAt: date.toDateString()
        })
        history.push("/")
      })
    })
  }
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setNameError('')
            }}
            id="fname"
            name="Name"
            defaultValue="John"
          />
          <br />
          {nameError && <span className="error">{nameError}</span>}
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
              setCategoryError('')
            }}
            id="fname"
            name="category"
            defaultValue="John"
          />
          <br />
          {categoryError && <span className="error">{categoryError}</span>}
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input className="input"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value)
              setPriceError('')
            }}
            type="number" id="fname" name="Price" />
          <br />
          {priceError && <span className="error">{priceError}</span>}
          <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          <br />
          <input type="file"
            onChange={(e) => {
              setImage(e.target.files[0])
              setImageErr('')
            }} />
          <br />
          {imageErr && <span className='error'>{imageErr}</span>}
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
