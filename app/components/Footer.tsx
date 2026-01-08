import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Ready to Join?</h2>
          <p className={styles.subtitle}>
            Become a part of the TheLocalHost community. Create an account to post topics, reply to threads, and engage with fellow developers.
          </p>
          <Link href="/register" className={styles.registerButton}>
            Create Your Account Now
          </Link>
        </div>
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} TheLocalHost. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
