import React from 'react'
import "./layout.scss"
export default function Layout({children}){
    return(
        <div className="bg-gray-100 rounded-lg p-5">
            <div className="layout-header">
                <img src="/assets/images/top_image.png" className="w-full"/>
            </div>
            <main>{children}</main>
            <img src="/assets/images/woman.png" className="m-auto"/>
        </div>
    )
}