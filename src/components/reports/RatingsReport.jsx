import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import EntityCardTest from "../client_components/EntityCardTest";
import { Container } from "react-bootstrap";
import ServerName from "../../ServerName";

function RatingsReport({ type, userType }) {
  const [averageRating, setAverageRating] = useState(0);
  const [bestVacation, setBestVacation] = useState({
    id: "",
    photo: "",
    name: "",
    price: "",
    rating: "",
    address: "",
  });
  const [bestCard, setBestCard] = useState(<></>);
  const [worstCard, setWorstCard] = useState(<></>);
  const [worstVacation, setWorstVacation] = useState({
    id: "",
    photo: "",
    name: "",
    price: "",
    rating: "",
    address: "",
  });
  useEffect(() => {
    getAverageRating();
    getBestVacation();
    getWorstVacation();
  }, []);
  useEffect(() => {
    setBestCard(createCard(bestVacation));
    setWorstCard(createCard(worstVacation));
  }, [bestVacation, worstVacation, averageRating]);

  function getAverageRating() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const path = `${ServerName}entity/getAverageRating`;
    let rating;
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + token.accessToken,
      },
    };
    axios.get(path, requestOptions).then((res) => {
      rating = res.data;
      setAverageRating(rating);
    });
  }
  function getBestVacation() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const path = `${ServerName}entity/getBestRated`;
    let data;
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + token.accessToken,
      },
    };
    axios.get(path, requestOptions).then((res) => {
      data = {
        id: res.data.id,
        name: res.data.name,
        photo: res.data.firstImage,
        price: res.data.price,
        rating: res.data.averageScore,
        address: res.data.address,
      };
      console.log(data);
      setBestVacation(data);
      setBestCard(createCard(bestVacation));
    });
  }
  function createCard(data) {
    return (
      <EntityCardTest
        id={data.id}
        title={data.name}
        address={data.address}
        price={data.price}
        rating={data.rating}
        image={data.photo}
        type={userType}
      />
    );
  }
  function getWorstVacation() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const path = `${ServerName}entity/getWorstRated`;
    let data;
    const requestOptions = {
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + token.accessToken,
      },
    };
    axios.get(path, requestOptions).then((res) => {
      console.log(res.data);
      data = {
        id: res.data.id,
        name: res.data.name,
        photo: res.data.firstImage,
        price: res.data.price,
        rating: res.data.averageScore,
        address: res.data.address,
      };
      console.log(data);
      setWorstVacation(data);
      setWorstCard(createCard(worstVacation));
    });
  }
  return (
    <Container>
      <p>
        Average {type} Rating: {averageRating}
      </p>
      <p>
        Best Rated{type}: {averageRating}
      </p>
      {bestCard}
      <p>
        Worst Rated{type}: {averageRating}
      </p>
      {worstCard}
    </Container>
  );
}

export default RatingsReport;
