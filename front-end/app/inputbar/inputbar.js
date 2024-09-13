'use client'

import { useState } from "react";
import axios from 'axios';
import styles from "./inputbar.module.css";

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
        <div>
            <h1 className={styles.header}>Enter a YouTube URL to get started!</h1>
            <input className={styles.inputGroup} placeholder="Enter URL here..."
                onInput={e => {
                        setFieldDict(prevFieldDict => ({...prevFieldDict, URL: e.target.value}));
                }}
            />
            <button className={styles.button} onClick={() => sendURL()}>
                <span className={styles.front}> Go! </span>
            </button>
        </div>
    );
}



