import React from "react";
import { Link } from "react-router-dom";
import './foot.css'

const Foot = () => {
    return (
        <>
        <div className="my-card bg-green-400 ">
            <div>
                <h1>Backend Developer 1</h1>
                <p>I do backend developer With express and python mainly FastApi and Flask</p>
            </div>

            <div>
                <h1>Project 2</h1>
                <p>Project Description</p>
            </div>
            <div>
                <h1>Project 3</h1>
                <p>Project Description</p>
            </div>
            <div>
                <h1>Project 4</h1>
                <p>Project Description</p>
            </div>
        </div>
        </>
        )
};

export default Foot;