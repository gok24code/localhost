import Link from "next/link";
import styles from "./Navbar.module.css";

const Navbar = () => {
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
          <Link href="/qna">QNA</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
