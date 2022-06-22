import "../../style/Errors.css";
import axios from "axios";
import React from "react";
import EntityList from "../client_components/EntityList";
import ChangePasswordPage from "../business/ChangePasswordPage";
import ServerName from "../../ServerName";

export default function HomePageAdmin() {
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    activate();
  }, []);

  async function activate() {
    const token = JSON.parse(localStorage.getItem("userToken"));
    const requestOptions = {
      headers: { Authorization: "Bearer " + token.accessToken },
    };
    await axios
      .get(`${ServerName}user/isAdminActive`, requestOptions)
      .then((res) => {
        if (res.data == 1) {
          setIsActive(<EntityList type="ALL_ENTITIES" userType="admin" />);
        } else
          setIsActive(
            <>
              <h1> You should change your password first </h1>{" "}
              <ChangePasswordPage></ChangePasswordPage>
            </>
          );
      });
  }

  return isActive;
}
