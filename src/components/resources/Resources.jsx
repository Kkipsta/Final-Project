import { useEffect, memo,useState } from "react";
import { useHistory } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient";
import { connect } from "react-redux";
import { fetchResources } from "../../redux/resources/ResourcesActions";


const Resources = ({ resourcesData, fetchResources }) => {
  let history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");




  useEffect(() => {
    fetchResources();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  useEffect(() => {
    const isLogedIn = localStorage.getItem("isLogedIn");



    if (isLogedIn && JSON.parse(isLogedIn) === true) {
      history.push("/resources");
    } else {
      history.push("/");
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);




  const insertProduct = async (id,title,description,image,price,category) => {
    try {
      const { error } = await supabase
        .from("products")
        .insert([{
            id: id,
            title: title,
            description: description,
            image: image,
            price: price,
            category: category,
          },
        ]);

        if (error) {
            setErrorMessage("დაფიქსირდა შეცდომა");
            throw error;
        }
    } catch (error) {
        setErrorMessage(error.error_description || error.message);
    }
  };






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
        {resourcesData &&
          resourcesData.resources &&
          resourcesData.resources.map((el, i) => (
            <div
              key={i}
              className="bg-white p-2 w-80 max-w-3xl sm:w-full sm:p-4  sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none"
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

                  <button
                    onClick={() =>
                      insertProduct(
                        el.id,
                        el.title,
                        el.description,
                        el.image,
                        el.price,
                        el.category
                      )
                    }
                    style={{ color: `${el.color}` }}
                    className="ml-auto flex items-center gap-1 sm:text-lg border border-gray-300 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors focus:bg-gray-100 focus:outline-none focus-visible:border-gray-500"
                  >
                    <span>Buy</span>
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

const mapStateToProps = (state) => {
  // debugger

  return {
    resourcesData: state.resource,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchResources: () => dispatch(fetchResources()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Resources));
