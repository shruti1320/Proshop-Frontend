import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../Slices/userSlice";
import { useNavigate } from "react-router-dom";
import "./SideBar.scss";

export default function SideBar() {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(removeUser());
    navigate("/login");
    localStorage.removeItem("token");
  };

  return (
    <div
      id="simple-list-example"
      className="d-flex flex-column gap-3 simple-list-example-scrollspy bg-light p-4"
      style={{
        borderRight: "2px solid white",
        width: "350px", // Adjust the width here
      }}
    >
      <div className="fw-bold">
        <a href="/order" className="text-decoration-none d-block text-start">
          <i className="fa-solid fa-cube me-2"></i>MY ORDERS
        </a>
      </div>
      <hr className="my-2"></hr>
      <div>
        <p className="fw-bold mb-1">
          <i className="fa-solid fa-user me-2"></i>ACCOUNT SETTINGS
        </p>
        <ul className="list-unstyled mb-0">
          <li>
            <a
              className="p-1 text-decoration-none d-block text-start"
              href="/profile"
            >
              Profile information
            </a>
          </li>
          <li>
            <a className="p-1 text-decoration-none d-block text-start" href="#">
              Manage Address
            </a>
          </li>
          <li>
            <a
              className="p-1 text-decoration-none d-block text-start"
              href="#simple-list-item-4"
            >
              PAN Card information
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-2"></hr>
      <div>
        <p className="fw-bold mb-1">
          <i className="fa-solid fa-money-check me-2"></i>PAYMENT
        </p>
        <ul className="list-unstyled mb-0">
          <li>
            <a
              className="p-1 rounded text-decoration-none d-block text-start"
              href="/upi"
            >
              Saved UPI
            </a>
          </li>
          <li>
            <a
              className="p-1 rounded text-decoration-none d-block text-start"
              href="/card"
            >
              Saved Cards
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-2"></hr>
      <div>
        <p className="fw-bold mb-1">
          <i className="fa-solid fa-wallet me-2"></i>MY STUFF
        </p>
        <ul className="list-unstyled mb-0">
          <li>
            <a
              className="p-1 rounded text-decoration-none d-block text-start"
              href="/favouriteScreen"
            >
              My wishlist
            </a>
          </li>
          <li>
            <a
              className="p-1 rounded text-decoration-none d-block text-start"
              href="/card"
            >
              My Reviews & Ratings
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-2"></hr>
      <div>
        <a
          href="/"
          onClick={handleLogout}
          className="text-decoration-none d-block text-start"
        >
          <i className="fa-solid fa-power-off me-2"></i>Logout
        </a>
      </div>
    </div>
  );
}
