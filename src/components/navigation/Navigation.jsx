import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { supabase } from '../../supabase/supabaseClient'
import { ShoppingCart } from "react-feather";



import Login from "../login/Login";
import Home from "../home/Home";
import Registration from "../registration/Registration";
import  UserProducts from "../user_products/UserProducts"
import Resources from "../resources/Resources";


import "./navigation.css";

const Navigation = () => {
  let history = useHistory();


  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.setItem("isLogedIn", false);
    history.push("/");
    history.go(0);
  };




  return (
    <>
      <Router>
        <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
          <ul className="navigation-list hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">

            <li>
              <Link
                className="text-sm text-gray-400 hover:text-gray-500"
                to="/">
                Home
              </Link>
            </li>


            <li>
              <Link
                className="text-sm text-gray-400 hover:text-gray-500"
                to="/login">
                Login
              </Link>
            </li>


            <li>
              <Link
                className="text-sm text-gray-400 hover:text-gray-500"
                to="/register">
                Register
              </Link>
            </li>


            <li>
              <Link
                className="text-sm text-gray-400 hover:text-gray-500"
                to="/resources">
                Products
              </Link>
            </li>


            <li
              className="text-sm text-gray-400 hover:text-gray-500"
              onClick={() => logout()}
              style={{ cursor: "pointer" }}>
              <p>Log out</p>
            </li>

            
            <li>
              <Link
                className="text-sm text-gray-400 hover:text-gray-500"
                to="/user_products">
                    <ShoppingCart stroke="red"/>
                    <div className="user_cart"></div>
              </Link>
            </li>

          </ul>
        </nav>






        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/login" component={Login} />

          <Route path="/register" component={Registration} />
          
          {/* <Route path="/products" component={Products} /> */}


          <Route path="/resources" component={Resources} />

          <Route path="/user_products" component={UserProducts} />

        </Switch>
      </Router>
    </>
  );
};

export default Navigation;
