import styles from "@/app/static-page.module.css";

export default function QnaPage() {
  return (
      <div className={styles.container}>
        <h1 className={styles.title}>Q&A</h1>
        <div className={styles.content}>
          <p>
            Have questions about the forum? Here you'll find answers to the most common questions.
          </p>
          <p>
            <strong>Q: How do I post a new topic?</strong><br/>
            A: Once you are logged in, you can find a "New Topic" button in your user dashboard.
          </p>
          <p>
            <strong>Q: What are the community guidelines?</strong><br/>
            A: We believe in respectful and constructive conversation. A full set of guidelines will be published here soon.
          </p>
        </div>
      </div>
  );
}
