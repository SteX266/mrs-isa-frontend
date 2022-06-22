import { useParams } from "react-router";
import EditVessel from "../edit/EditVessel";
import EditAdventure from "../edit/EditAdventure";
import EditListing from "../edit/EditListing";

export default function BusinessUserEditPage(props) {
  let component = "";
  switch (props.type) {
    case "host":
      component = <EditListing listingId={useParams()["id"]}></EditListing>;
      break;
    case "captain":
      component = <EditVessel vesselID={useParams()["id"]}></EditVessel>;
      break;
    case "instructor":
      component = (
        <EditAdventure adventureID={useParams()["id"]}></EditAdventure>
      );
      break;
    default:
      break;
  }
  return <>{component}</>;
}
