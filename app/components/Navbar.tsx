import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/crew">Crew</Link>
        </li>
        <li>
          <Link href="/qna">Q&A</Link>
        </li>
        <li>
          <Link href="/support">Support</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
