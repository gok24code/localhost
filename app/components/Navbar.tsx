import Link from "next/link";
import { User } from "@supabase/supabase-js";
import styles from "./Navbar.module.css";
import LogoutButton from "./LogoutButton"; // We will create this next

interface NavbarProps {
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <nav className={styles.navbar}>
      {/* Left side or Center links */}
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
      </ul>

      {/* Right side: User menu or Login/Register buttons */}
      <div className={styles.navRight}>
        {user ? (
          <div className={styles.userMenu}>
            <Link href="/dashboard" className={styles.usernameLink}>
              {/* Supabase user metadata can be used here if set */}
              {user.user_metadata.user_name || user.email}
            </Link>
            <LogoutButton />
          </div>
        ) : (
          <div className={styles.authButtons}>
            <Link href="/login" className={styles.loginButton}>
              Login
            </Link>
            <Link href="/register" className={styles.registerButton}>
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
