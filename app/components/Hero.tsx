import styles from "./Hero.module.css";

const Hero = () => {
  const siteName = "TheLocalHost";

  return (
    <div className={styles.heroContainer}>
      <h1 className={styles.title}>
        {siteName.split("").map((char, index) => (
          <span
            key={index}
            style={{ animationDelay: `${index * 0.1}s` }}
            className={styles.char}
          >
            {char}
          </span>
        ))}
      </h1>
      <p className={styles.subtitle}>
        The modern community forum for developers and enthusiasts.
      </p>
    </div>
  );
};

export default Hero;
