import React from 'react';

function Header(props) {
  return (
    <header className="header">
      <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" width="80px" height="auto"/>
      <h2>{props.title}</h2>
    </header>
  );
}

export default Header;