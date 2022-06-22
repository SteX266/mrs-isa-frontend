import EntityCardTest from "../client_components/EntityCardTest";

export default function BusinessUserEntityList(props) {
  function renderAllEntities(entity) {
    return (
      <EntityCardTest
        id={entity.id}
        title={entity.name}
        address={entity.address}
        price={entity.price}
        rating={entity.averageScore}
        image={entity.firstImage}
        type={props.userType}
      />
    );
  }
  return (
    <>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row" id="entities">
            {props.services.map(renderAllEntities)}
          </div>
        </div>
      </div>
    </>
  );
}
