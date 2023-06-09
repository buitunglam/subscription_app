import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { styled } from "styled-components";

type Props = {};
const CardsContainer = styled.div`
  display: flex;
  height: 75vh;
  align-items: center;
  justify-content: center;
`;

const CardHeader = styled.div`
  height: 30rem;
  background-color: blue;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PriceCircle = styled.div`
  border: 0.5rem solid white;
  width: 12.5rem;
  height: 12.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
`;

const PriceText = styled.p`
  font-size: 3rem;
  color: white;
  text-shadow: 0.1rem 0.1rem 1rem rgba(19, 20, 19, 0.342);
`;

const ArticlePlans = (props: Props) => {
  const [prices, setPrices] = useState<any[]>([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const { data: response } = await axios.get(
        "http://localhost:8080/subs/prices"
      );
      console.log(response);
      setPrices(response.prices);
    } catch (error) {
      console.log("error..", error);
    }
  };

  const backgroundColors: any = {
    Basic: "linear-gradient(-20deg, #00cdac 0%, #8ddad5 100%)",
    Standard: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
    Premium: "linear-gradient(to top, #f77062 0%, #fe5196 100%)",
  };

  const createSession = async (priceId: string) => {
    const { data: response } = await axios.post(
      "http://localhost:8080/subs/sessions",
      {
        priceId,
      }
    );
    console.log('response.url...', response);
    window.location.href = response.session.url
  };

  return (
    <Container>
      <CardsContainer>
        {prices.length > 0
          ? prices.map((price: any) => {
              return (
                <Card
                  style={{
                    width: "18rem",
                    height: "25rem",
                    marginRight: "2rem",
                  }}
                >
                  <CardHeader
                    style={{
                      background: backgroundColors[price.nickname],
                    }}
                  >
                    <PriceCircle>
                      <PriceText>${price.unit_amount / 100}</PriceText>
                    </PriceCircle>
                  </CardHeader>
                  <Card.Body>
                    <Card.Title style={{ fontSize: "2rem" }}>
                      {price.nickname}
                    </Card.Title>
                    <Button
                      variant="primary"
                      className="mt-2"
                      onClick={() => createSession(price.id)}
                    >
                      Buy now
                    </Button>
                  </Card.Body>
                </Card>
              );
            })
          : null}
      </CardsContainer>
    </Container>
  );
};

export default ArticlePlans;
