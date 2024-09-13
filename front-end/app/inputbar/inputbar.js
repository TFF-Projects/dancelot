'use client'

import { useState } from "react";
import axios from 'axios';

export default function InputBar() {

    const [fieldDict, setFieldDict] = useState(
        {
            URL: "",
        });

    function sendURL() {
        console.log(`URL: ${fieldDict.URL}`);
        // call server api function to download from url
        // window.location.href = `http://localhost:3000/download?URL=${fieldDict.URL}`;
        axios.get(`http://localhost:4000/download?URL=${fieldDict.URL}`)
    }

    return (
        <div className="inputbar">
            <input 
                className= "URL-input" 
                placeholder="Enter a video URL e.g., https://www.youtube.com/watch?v=hPt1gUE1zAc"  
                onInput={e => {
                        setFieldDict(prevFieldDict => ({...prevFieldDict, URL: e.target.value}));
                }}
            />
            <button onClick={() => sendURL()}>Submit</button>
        </div>
    );
}



