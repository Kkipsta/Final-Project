import { supabase } from "../../supabase/supabaseClient";
import { useEffect, useState } from "react";
import "./userProducts.css";

import { useHistory } from "react-router-dom";





const UserProducts =  () => {
  const [product, setProduct] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  let history = useHistory();

  const getAllProducts = async () => {
    try {
      let { data: products, error } = await supabase
        .from("products")
        .select("*");

      if (error) {
        setErrorMessage("დაფიქსირდა შეცდომა");
        throw error;
      }

      setProduct(products);
    } catch (error) {
      setErrorMessage(error.error_description || error.message);
    }
  };





  const deleteProducts = async (id) => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) {
        setErrorMessage("დაფიქსირდა შეცდომა");
        throw error;
      }

    } catch (error) {
      setErrorMessage(error.error_description || error.message);
    }
  };




  useEffect(() => {
    getAllProducts();


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);





  useEffect(() => {
    const isLogedIn = localStorage.getItem("isLogedIn");

    if (isLogedIn && JSON.parse(isLogedIn) === true) {
      history.push("/user_products");
    } else {
      history.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);







  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        {product &&
          product &&
          product.map((el, i) => (
            <div
              key={i}
              className="bg-white p-2 w-80 max-w-3xl sm:w-full sm:p-4 h-auto sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none"
            >
              <div
                style={{
                  backgroundImage: `url(${el.image})`,
                }}
                className="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-100 bg-center bg-cover"
              ></div>

              <div className="flex sm:flex-1 flex-col gap-2 p-1">
                <h1 className="text-lg sm:text-xl font-semibold  text-gray-600">
                  {el.title}
                </h1>

                <p className="text-gray-500 text-sm sm:text-base line-clamp-3">
                  {el.description}
                </p>

                <div className="flex gap-4 mt-auto">
                  <button className="flex items-center gap-1 sm:text-lg border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500">
                    <span>price: {el.price} ლარი</span>
                  </button>

                  <button className="flex items-center gap-1 sm:text-lg border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500">
                    <span>{el.category}</span>
                  </button>

                  <button onClick={() => deleteProducts(el.id)} className="flex items-center gap-1 sm:text-lg border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500">
                    <span>delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

        <h1>{errorMessage}</h1>
      </div>
    </>
  );
};

export default UserProducts;
