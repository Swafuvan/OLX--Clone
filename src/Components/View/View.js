import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { FirebaseConstent } from '../../store/Context';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

function View() {
  const [postDetails, setPostDetails] = useState(null)
  const { firebase } = useContext(FirebaseConstent);
  const { id } = useParams()
  useEffect(() => {
    firebase.firestore().collection('products').get().then((snapshot) => {
      snapshot.docs.forEach((product) => {
        const data = product.data()
        firebase.firestore().collection('users').doc(data.userId).get()
          .then((userDoc) => {
            const userData = userDoc.data();
            const dataWithUser = { ...data, user: userData }; // Add user details to product data
            console.log(dataWithUser);
            if (product.id === id) {
              setPostDetails(dataWithUser);
            }
          })
      })
    })
  }, [])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails && postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails && postDetails.price} </p>
          <span>{postDetails && postDetails.name}</span>
          <p>{postDetails && postDetails.category}</p>
          <span>{postDetails && postDetails.createAt}</span>
        </div>
        <div className="contactDetails">
          <p>Seller Details</p>
          <p>{postDetails && postDetails.user.username}</p>
          <p>{postDetails && postDetails.user.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;
