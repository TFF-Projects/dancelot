import Image from "next/image";
import Link from "next/link";

import styles from "./navbar.module.css";

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <Link href="/" className={styles.logo}>
                <Image src="/dance-logo.png" alt="Dancelot Logo" width={30} height={30}/>
                <div className={styles.logotext}>Dancelot</div>
            </Link>
        </nav>
    );
}