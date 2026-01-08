import styles from "@/app/static-page.module.css";

export default function AboutPage() {
  return (
      <div className={styles.container}>
        <h1 className={styles.title}>About TheLocalHost</h1>
        <div className={styles.content}>
          <p>
            TheLocalHost is a community-driven forum for developers, designers, and tech enthusiasts. Our mission is to create a space where knowledge is shared freely and everyone is welcome to contribute.
          </p>
          <p>
            Whether you are a beginner starting your journey or a seasoned expert, you'll find valuable discussions and a supportive community here.
          </p>
        </div>
      </div>
  );
}
