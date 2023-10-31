import React, { useState } from "react";
import Header from "../background/Header";
import { Container, Input, Btn } from "../login/LoginPage";

function FindPwPage() {
  return (
    <>
      <Container>
        <Header title="비밀번호 초기화" />
        <div>
          <Input type="id" placeholder="비밀번호를 입력하세요" />
        </div>
        <div>
            <Btn>코드 발송</Btn>
        </div>
      </Container>
    </>
  );
}

export default FindPwPage;
