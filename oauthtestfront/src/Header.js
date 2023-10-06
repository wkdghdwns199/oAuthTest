import React from 'react';
import styled from 'styled-components';

const Head = styled.header`
  margin: 20px;
`;


function Header(props) {
  return (
    <Head>
      <img src={process.env.PUBLIC_URL + '/logo.png'} alt="logo" width="80px" height="auto"/>
      <h2>{props.title}</h2>
    </Head>
  );
}

export default Header;