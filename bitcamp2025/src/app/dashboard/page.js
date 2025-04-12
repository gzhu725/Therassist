"use client";
import React, { useState, useRef, useCallback } from "react";
import NavBar from "../components/NavBar";

const Name = () => {
  const [text, setText] = useState("Hi");

    return (
        <div>
            <NavBar />
            <table>
                <tr>
                    <th>
                        <h2 className="text-3xl font-semibold mb-8 mt-20">
                            Therapist
                        </h2> 
                    </th>
                </tr>
                <tr>
                <td>
                    one
                    <label for="cars">Choose a car:</label>
                    <select name="cars" id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                    </select>   
                    three
                </td>
                <td>
                    two
                </td>
                </tr>
            </table>
        </div>
    )
}

export default Name;