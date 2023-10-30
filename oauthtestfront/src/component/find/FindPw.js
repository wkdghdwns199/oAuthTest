import React, { useState } from "react";
import styled from "styled-components";
import Header from "../background/Header";
import { Container, Input, PasswordInput, Btn } from "../login/LoginPage";

// styled-componets


function FindPw() {
  return (
    <>
      <Container>
        <Header title="비밀번호 초기화" />
        <div>
          <Input type="id" placeholder="비밀번호" />
        </div>
        <div>
            <Btn>코드 발송</Btn>
        </div>
      </Container>
    </>
  );
}

export default FindPw;
