import { createSupabaseServerClient } from "@/app/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import styles from "./dashboard.module.css";
import DeleteAccount from "../components/DeleteAccount";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const username = user.user_metadata.user_name || user.email;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome, {username}</h1>
      <p className={styles.subtitle}>This is your personal dashboard.</p>

      <div className={styles.grid}>
        {/* New Topic Card */}
        <Link href="/topics/new" className={styles.card}>
          <h2>Create New Topic &rarr;</h2>
          <p>Share your thoughts and start a new discussion.</p>
        </Link>

        {/* Biography Card */}
        <div className={styles.card}>
          <h2>Your Biography</h2>
          <p className={styles.bioPlaceholder}>
            Your biography is not set yet. We will add an edit option soon.
          </p>
        </div>

        {/* Account Deletion Card */}
        <div className={`${styles.card} ${styles.dangerZone}`}>
          <h2>Danger Zone</h2>
          <p>
            This action is irreversible. Please be certain before deleting your account.
          </p>
          <DeleteAccount />
        </div>
      </div>
    </div>
  );
}
