"use client";
import axios from 'axios'
import { useEffect, useState } from 'react';


export default function TherapistView() {
    const username = "therapist1"; // set with login 

    const [therapist, setTherapist] = useState(null);

    useEffect(() => {
        // Fetch data from your backend
        fetch(`http://localhost:5001/getUsers/${username}`)
        .then((res) => {
            if (!res.ok) throw new Error("User not found");
            return res.json();
        })
        .then((data) => {
        setTherapist(data);
        })
        .catch((err) => console.error("Error fetching users:", err));
      }, [username]);

    console.log(therapist);
    const clients = therapist?.userInfo?.clients || [];
    console.log(clients);
      
    
    return (
        <>
            {/* upload image only for now */}
            {/* if (!username) return <p>Loading user data...</p>; */}

            <h1>hello therapist</h1>
            { therapist ? 
            (<h1>{therapist.name}</h1>) : (<p>Loading user data...</p>)
            }
            <h1>search field</h1>
        </>
    );
}