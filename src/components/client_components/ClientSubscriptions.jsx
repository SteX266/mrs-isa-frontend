import axios from "axios";
import React, { useEffect, useState } from "react";
import EntityCardTest from "./EntityCardTest";
import ServerName from "../../ServerName";

export default function ClientSubscriptions() {
  const [allEntities, setAllEntities] = useState([]);

  useEffect(() => {
    getSubscriptions();
  }, []);

  function getSubscriptions() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const username = localStorage.getItem("username");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token.accessToken,
      },
      params: {
        username: username,
      },
    };
    axios
      .get(`${ServerName}user/getClientSubscriptions`, requestOptions)
      .then((res) => {
        setAllEntities(res.data);
      });
  }

  function renderAllEntities(entity) {
    return (
      <EntityCardTest
        id={entity.id}
        title={entity.name}
        address={entity.address}
        price={entity.price}
        rating={entity.averageScore}
        image={entity.firstImage}
        type={"client"}
      />
    );
  }

  return (
    <>
      <p className="h1">SUBSCRIPTIONS</p>
      <div className="album py-5 ">
        <div className="container">
          <div className="row" id="entities">
            {allEntities.map(renderAllEntities)}
          </div>
        </div>
      </div>
    </>
  );
}
