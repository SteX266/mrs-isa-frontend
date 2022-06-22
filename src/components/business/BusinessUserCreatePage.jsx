import CreateAdventure from "../create/CreateAdventure";
import CreateVessel from "../create/CreateVessel";
import CreateListing from "../create/CreateListing";
export default function BussinessUserCreatePage(props) {
  let component = "";
  switch (props.type) {
    case "host":
      component = <CreateListing></CreateListing>;
      break;
    case "captain":
      component = <CreateVessel></CreateVessel>;
      break;
    case "instructor":
      component = <CreateAdventure></CreateAdventure>;
      break;
    default:
      break;
  }
  return <>{component}</>;
}
