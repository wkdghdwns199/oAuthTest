import React from "react";
import styled from "styled-components";
import { Routes, Route, Link } from "react-router-dom";

const Head = styled.header`
  margin: 20px;
`;

function Header(props) {
  return (
    <Head>
      <div></div>
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
