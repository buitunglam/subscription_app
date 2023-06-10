import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { styled } from "styled-components";

interface Props {}
interface Article {
  id: string;
  title: string;
  imageUrl: string;
  content: string;
  access: string;
}

const CardContainer = styled.div`
  padding: 4rem 0;
  display: flex;
`;

// const Card = styled.div`
//   height: 55rem;
//   width: 30%;
//   box-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.2);
//   padding: 2rem;
//   border-radius: 2rem;
//   margin-right: 2rem;
//   over-flow: hidden;
// `;

// const Image = styled.img`
//   width: 100%;
//   height: 30rem;
//   border-radius: 2rem;
// `;

// const Header = styled.p`
//   margin-top: 1rem;
//   font-size: 1.5rem;
// `;

// const Content = styled.div`
//   height: 250px;
//   border: 1px solid;
//   overflow: hidden;
// `;

const Articles = (props: Props) => {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(() => {
    getListArticles();
  }, []);

  const getListArticles = async () => {
    const { data: response }: any = await axios.get(
      "http://localhost:8080/articles"
    );
    console.log("response .....", response);
    setArticles(response.articles);
  };

  return (
    <Container className="mt-3">
      <Row className="col-12">
        {articles && articles.length ? (
          articles.map((article) => (
            <Col md="6" lg="3" className="mb-4">
              <Card
                style={{
                  height: "500px",
                  borderRadius: "20px",
                  width: "80%",
                  border: "none",
                  cursor: "pointer",
                }}
                className="p-3 shadow p-3 mb-5 bg-white"
              >
                <img
                  src={article.imageUrl}
                  style={{
                    height: "190px",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                  alt="img"
                />
                <div
                  style={{ overflow: "hidden", height: "55%" }}
                  className="mt-3"
                >
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>{article.content}</Card.Text>
                </div>
              </Card>
            </Col>
          ))
        ) : (
          <div>You don't have a plan</div>
        )}
      </Row>
    </Container>
  );
};

export default Articles;
