import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import {Head} from "../../styles/background/Head";


function Header(props) {
  return (
    <Head>
      <div>นÝป็</div>
      <img
        src={process.env.PUBLIC_URL + "/logo.png"}
        alt="logo"
        width="80px"
        height="auto"
      />
      <h2>{props.title}</h2>
    </Head>
  );
}

export default Header;
