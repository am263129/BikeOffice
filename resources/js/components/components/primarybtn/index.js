import React, { useState } from "react"

export default function PrimaryButton(props){
    const {selected, click, className} = props
    return(
        <div className={`text-center cursor-pointer rounded-xl min-w-lg  items-center ${selected?"bg-primary-dark text-primary":"bg-primary text-primary-dark"}  ${className}  px-3 py-2`} onClick={click}>
            {props.name}
        </div>
    )
}