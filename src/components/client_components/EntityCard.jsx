import "../../style/EntityCard.css"
import { Link } from "react-router-dom";



const EntityCard = (props) =>  {  
    var link = "/client/profile/" + props.id;
    var title = props.title;
    if(title.length > 12){
      title = title.slice(0,11);
      title+="..."
    }


    return <>
    <div className="col-md-3">
    <Link to={link}>

  <div className="card align-self-stretch entityCard" styleProp="width: 18rem;">
     <img  height="200px" src={props.image} alt="Nesto"/>
     <hr/>
     <div className="card-body">
       <h3 className="card-title">{title}</h3>
       <span className="lokacija">{props.address}</span>
       <p className="card-text">{props.price}$</p>
       <div className="row justify-content-around align-items-center"><span className="ocena">{props.rating}/5</span>
       
     </div></div>
   </div>
   </Link>

   </div>
</>}

export default EntityCard;
