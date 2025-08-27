import React from "react";
import logo from "../../../public/images/svg/header-logo.svg";
import { NavLink } from "react-router";
import cart from "../../../public/images/svg/cart.svg";
import profile from "../../../public/images/svg/profile.svg";
import search from "../../../public/images/svg/search.svg";
import heart from "../../../public/images/svg/heart.svg";
import { useCartStore } from "../../store/cartStore";

function Header() {
  const { getCartItemCount } = useCartStore();
  const cartItemCount = getCartItemCount();

  return (
    <>
      <header>
        <div>
          <div className="cont">
            <div className="menu my-[30px] flex justify-between items-center">
              <div className="logo">
                <img src={logo} alt="logo" />
              </div>
              <div>
                <ul className="w-[430px] flex items-center justify-between">
                  <li>
                    <NavLink to={"/"}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to={"*"}>Shop</NavLink>
                  </li>
                  <li>
                    <NavLink to={"*"}>About</NavLink>
                  </li>
                  <li>
                    <NavLink to={"*"}>Contacts</NavLink>
                  </li>
                </ul>
              </div>
              <div className="actions">
                <div>
                  <ul className="w-[247px] flex items-center justify-between">
                    <li>
                      <NavLink to={"*"}>
                        <img src={profile} />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"*"}>
                        <img src={search} />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={"*"}>
                        <img src={heart} />
                      </NavLink>
                    </li>
                    <li className="relative">
                      <NavLink to={"/cart"}>
                        <img src={cart} />
                        {cartItemCount > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {cartItemCount}
                          </span>
                        )}
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
