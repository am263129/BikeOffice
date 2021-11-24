import React, { useState } from "react"

export default function PrimaryButton(props){
    const {selected, click, className} = props
    return(
        <div className={`h-12 min-w-max text-md md:text-md max-h-max text-center cursor-pointer rounded-md min-w-lg   ${selected?"bg-primary-dark text-primary":"bg-primary text-white hover:bg-primary-darkgreen "}  ${className}  px-10 py-2 text-center flex items-center justify-center`} onClick={click}>
            {props.name}
        </div>
    )
}