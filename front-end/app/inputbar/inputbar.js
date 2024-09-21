'use client'

import { useState } from "react";
import axios from 'axios';
import styles from "./inputbar.module.css";
import { useRouter } from 'next/navigation'

export default function InputBar() {
    const router = useRouter()
    const [progress, setProgress] = useState(0);
    const [displayProgress, setDisplayProgress] = useState(false);

    const [fieldDict, setFieldDict] = useState(
        {
            URL: "",
        });

    async function sendURL() {
        console.log(`URL: ${fieldDict.URL}`);
        setDisplayProgress(true);
        // call server api function to download from url
        // window.location.href = `http://localhost:3000/download?URL=${fieldDict.URL}`;
        axios.get(`http://localhost:4000/download?URL=${fieldDict.URL}`);
        router.push(`/play?URL=${fieldDict.URL}`);
    }

    if (displayProgress) {
            return (<div><progress className={styles.progressbar}></progress><h5>Downloading...</h5></div>);
    } else {
        return(
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
}



