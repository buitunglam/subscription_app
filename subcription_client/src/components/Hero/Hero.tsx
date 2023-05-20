import React from "react";
import { styled } from "styled-components";
import Container from "react-bootstrap/Container";
import ModalComponent from "../Modal/Modal";
type Props = {};

const HeroComponents = styled.header`
  padding: 2rem 0;
  height: 80vh;
  background-image: url("https://images.unsplash.com/photo-1476673160081-cf065607f449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const HeaderContainer = styled.div`
  background-color: rgb(5, 148, 112);
  padding: 3rem;
  color: white;
  width: 32.5rem;
`;

const Heading = styled.h1`
  font-size: 3rem;
`;
const SubHeading = styled.h3`
  margin: 1rem 0;
  font-weight: 400;
`;

const Hero = (props: Props) => {
  return (
    <HeroComponents>
      <Container style={{ height: "165px" }}>
        <HeaderContainer>
          <Heading>Feed your mind with the best</Heading>
          <SubHeading>
            Grow, learn, and become successfully by reading some of the top
            article by highly reputation individuals
          </SubHeading>
          <ModalComponent
            text={"Sign up"}
            variant="primary"
            isSignupFlow={true}
          />
          <ModalComponent
            text={"Login"}
            variant="danger"
            isSignupFlow={false}
          />
        </HeaderContainer>
      </Container>
    </HeroComponents>
  );
};

export default Hero;
