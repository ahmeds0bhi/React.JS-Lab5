import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GetProducts from "../Store/Actions/productsAction";
import { incrementCartCount } from "../Store/Actions/addToCartAction";
import { Link } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);

  useEffect(() => {
    dispatch(GetProducts());
  }, [dispatch]);

  const handleAddToCart = () => {
    dispatch(incrementCartCount());
  };

  return (
    <>
      {products.map((product) => (
        <div className="card col-4 mt-3 mb-3" key={product.id}>
          <img src={product.imgUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">Quantity: {product.quantity}</p>
            <p className="card-text">Price: {product.price}$ </p>
            <button className="btn btn-success w-100" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <Link
              className="btn btn-primary w-100 mt-2"
              to={`/products/${product.id}`}
            >
              More Details
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductList;
