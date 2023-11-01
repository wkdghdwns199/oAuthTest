        <Btn
          style={{
            // input들이 정확히 입력되지 않았을 때는 버튼 색이 원래의 50%만큼 투명하게 보이도록 설정
            backgroundColor: notAllow ? "#6e6e6e88" : "#6e6e6e",
          }}
          type="submit"
          onClick={handleSubmit}
          disabled={notAllow}
        >
          완료
        </Btn>
