import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import GetProducts from "../Store/Actions/productsAction";
import { incrementCartCount } from "../Store/Actions/addToCartAction";

export default function ShowProduct() {
  const { id } = useParams();
  let [product, setProduct] = useState({});

  let GetProductById = () => {
    axios
      .get(`http://localhost:2000/products/${id}`)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    GetProductById();
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetProducts());
  }, [dispatch]);

  const handleAddToCart = () => {
    dispatch(incrementCartCount());
  };

  return (
    <div className="container">
      <div className="row">
        <div>
          <div class="card">
            <img
              src={product.imgUrl}
              alt="..."
              className=" card-img-top w-50"
            ></img>
            <hr />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">Quantity: {product.quantity}</p>
              <p className="card-text">Price: {product.price} $</p>
              <Link to="/" className="btn btn-info ">
                More Products
              </Link>
              <button
                className="btn btn-success  d-block mt-3"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
