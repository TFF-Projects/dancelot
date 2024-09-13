import Image from "next/image";
import InputBar from "./inputbar/inputbar";
import styles from "./page.module.css";


export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <div className={styles.input}>
          <div className={styles.inputbardiv}>
            <InputBar className={styles.inputbar}/>
          </div>
        </div>
      </main>
    </div>
  );
}
