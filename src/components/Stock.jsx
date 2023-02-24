import React from "react";
import styled from "styled-components";

export default function Stock() {
  return (
    <Container>
      Stock Selected
      <div className="main">
        {" "}
        <p>Stocks details</p>
        <div className="btnwrapper">
          <button>Buy</button> <button>Sell</button>
        </div>
      </div>
    </Container>
  ); //holdings /buy sell
}
const Container = styled.div``;
