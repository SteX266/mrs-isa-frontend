import "../../style/EntityCardTest.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ServerName from "../../ServerName";

export default function EntityCardTest(props) {
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    setImage();
  }, [props.id]);

  async function setImage() {
    let ext = props.image.split(".");

    let result = await axios
      .get(`${ServerName}auth/getImage/` + props.image, {
        responseType: "blob",
        params: { extension: ext[1] },
      })
      .then((response) => {
        return URL.createObjectURL(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setPhoto(result);
  }

  var link = "/" + props.type + "/profile/" + props.id;
  if (props.type == "unregistered") {
    link = "/profile/" + props.id;
  }
  var title = props.title;
  if (title.length > 12) {
    title = title.slice(0, 11);
    title += "...";
  }

  return (
    <>
      <div className="col-lg-4 col-md-6 col-sm-10 offset-md-0 offset-sm-1 pt-lg-0 pt-4">
        <Link to={link}>
          <div className="card entity">
            {" "}
            <img className="slika card-img-top" src={photo} />
            <div className="card-body">
              <h6 className="font-weight-bold pt-1">{props.address}</h6>
              <div className="text-muted description">{props.title}</div>
              <div className="d-flex align-items-center product">
                {" "}
                <span className="fas fa-star"></span>{" "}
                <span className="fas fa-star"></span>{" "}
                <span className="fas fa-star"></span>{" "}
                <span className="fas fa-star"></span>{" "}
                <span className="far fa-star"></span>{" "}
              </div>
              <div className="d-flex align-items-center justify-content-between pt-3">
                <div className="d-flex flex-column">
                  <div className="h6 font-weight-bold">{props.price} USD</div>
                </div>
                <div className="dugme btn btn-primary">View</div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
