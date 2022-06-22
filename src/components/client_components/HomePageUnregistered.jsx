import Header from "./Header";
import Footer from "./Footer";
import React,{Component} from 'react'
import NavigationBar from "./NavigationBar";
import EntityList from "./EntityList";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ClientProfile from "./ClientProfile";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";

class HomePageUnregistered extends Component{
  
    render(){
    return <>


    
    

    <BrowserRouter>
    <Header/>
    <NavigationBar/>
    <Routes>
      <Route path="/" element={<EntityList type="ALL_ENTITIES"/>}/>
      <Route path="registration" element={<RegisterForm/>}/>    
      <Route path="login" element={<LoginForm/>}/>    
      <Route path="clientProfile" element={<ClientProfile/>}/>
      <Route path="vacations" element={<EntityList type="VACATION"/>}/>
      <Route path="vessels" element={<EntityList type="VESSEL"/>}/>
      <Route path="adventures" element={<EntityList type="ADVENTURE"/>}/>
      
    </Routes>
    </BrowserRouter>
    

    <Footer/>

  
  </>;

    }

}
export default HomePageUnregistered;