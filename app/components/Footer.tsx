import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.supportSection}>
          <Link href="/support" className={styles.supportLink}>
            Support
          </Link>
          <a href="mailto:support@thelocalhost.com" className={styles.mailLink}>
            Send Mail
          </a>
        </div>
        <div className={styles.bottomBar}>
          <p>&copy; {new Date().getFullYear()} TheLocalHost. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
