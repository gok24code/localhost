import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.supportSection}>
          <Link
            href="https://www.youtube.com/@gok24code"
            className={styles.supportLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Support
          </Link>
          <a href="mailto:goktugtoyguc@gmail.com" className={styles.mailLink}>
            Send Mail
          </a>
        </div>
        <div className={styles.bottomBar}>
          <p>
            &copy; {new Date().getFullYear()} TheLocalHost. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
