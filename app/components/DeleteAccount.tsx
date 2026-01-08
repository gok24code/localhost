"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../dashboard/dashboard.module.css";

export default function DeleteAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/delete-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "An unknown error occurred.");
      setLoading(false);
    } else {
      alert("Account deleted successfully. You will now be logged out.");
      // The user is effectively logged out since their account is gone.
      // Redirecting to the homepage will trigger a session check and log them out.
      router.push("/");
      router.refresh();
    }
  };

  return (
    <>
      <button className={styles.deleteButton} onClick={() => setIsModalOpen(true)}>
        Delete Account
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Confirm Account Deletion</h2>
            <p>
              This action cannot be undone. To confirm, please enter your password.
            </p>
            <form onSubmit={handleDelete}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className={styles.modalInput}
              />
              {error && <p className={styles.modalError}>{error}</p>}
              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={styles.cancelButton}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.confirmDeleteButton} disabled={loading}>
                  {loading ? "Deleting..." : "Delete My Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
