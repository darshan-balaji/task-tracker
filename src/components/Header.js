import React from "react"
import Button from "./Button.js"
function onClick(){
    console.log("click")
}
function Header({title,onAdd}){
    return(
        <header className="header">
        <h1>{title}</h1>
        <Button onClick={onAdd} color="green" text="add"/>
        </header>
    )
}

export default Header