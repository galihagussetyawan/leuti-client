import React from "react";

export default function Modal({ children }) {
    return (
        <div className=" md:w-full md:h-screen md:absolute md:top-0 md:z-10 hidden md:flex bg-black bg-opacity-40">
            <div className="m-auto md:bg-white">
                {children}
            </div>
        </div>
    );
}