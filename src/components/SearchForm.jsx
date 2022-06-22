import React,{Component} from "react";
import { MDBCol, MDBInput } from "mdbreact";

class SearchForm extends Component{
    constructor(props){
        super(props);
        
    }

    searchFieldChanged(){
        
    }

   render(){ 
  return (
    <MDBCol md="12">
      <MDBInput  hint="Search" type="text" containerClass="active-pink active-pink-2 mt-0 mb-3" />
    </MDBCol>
  );
}
}
export default SearchForm;