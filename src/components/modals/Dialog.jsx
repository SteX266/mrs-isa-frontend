import React,{useState} from 'react'
import "../../style/Dialog.css"


export default function Dialog({show, title, description, confirmed, canceled, hasText}){

  const [text, setText] = useState("");
    if(!show){
        return <></>;
    }
  function changeText(event){
    console.log(event.target.value);
    setText(event.target.value);
  }

    return (
        <div className="overlay">


        <div className="dialog">
    
          <div className="dialog__content">
            <h2 className="dialog__title">{title}</h2>
            <p className="dialog__description">{description}</p>
            {hasText && <textarea placeholder="Why do you want to delete your profile(optional)" className='col-md-12' style={{"resize":"none"}} onChange={changeText}></textarea>}
          </div>
    
          <hr />
    
          <div className="dialog__footer">
            <button onClick={canceled} className="dialog__cancel">Cancel</button>
            <button className="dialog__confirm" onClick={()  => confirmed(text)}>Yes</button>
          </div>
    
        </div>
    
      </div>


    )

}