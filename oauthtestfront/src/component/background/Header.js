import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Head } from "../../styles/background/Head";

function Header(props) {
  return (
    <Head>
      <Link to="/">
        <img
          src={process.env.PUBLIC_URL + "/logo.png"}
          alt="logo"
          width="80px"
          height="auto"
        />
      </Link>
      <h2 style={{ color: "#efefef", letterSpacing: "2px" }}>{props.title}</h2>
    </Head>
  );
}

export default Header;
