import React, { useState } from "react";
import Header from "../background/Header";
import { Container, Input, Btn } from "../login/LoginPage";

function FindPwPage() {
  return (
    <>
      <Container>
        <Header title="비밀번호 초기화" />
        <Input type="id" placeholder="비밀번호를 입력하세요" />
        <Btn>코드 발송</Btn>
      </Container>
    </>
  );
}

export default FindPwPage;
