import React from 'react'
import "./layout.scss"
export default function Layout({ children }) {
    return (
        <div className="bg-gray-800 rounded-lg p-5 justify-center flex">
            <div className="layout-container gap-5 flex flex-col">
                <div className="layout-header">
                    <img src="/assets/images/top_image.png" className="w-full" />
                </div>
                <main>{children}</main>
                <img src="/assets/images/woman.png" className="m-auto" />
            </div>
        </div>
    )
}