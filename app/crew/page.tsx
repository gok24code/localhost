import styles from "@/app/static-page.module.css";

export default function CrewPage() {
  return (
      <div className={styles.container}>
        <h1 className={styles.title}>Our Crew</h1>
        <div className={styles.content}>
          <p>
            TheLocalHost is maintained by a dedicated team of volunteers and moderators from around the world. We are passionate about building a positive and constructive community.
          </p>
          <p>
            (This page will later feature profiles of the core team members.)
          </p>
        </div>
      </div>
  );
}
