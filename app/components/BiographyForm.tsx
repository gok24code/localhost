"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { updateBiography } from "@/app/actions/updateBiography";
import styles from "./BiographyForm.module.css";

export default function BiographyForm({ biography }: { biography: string | null }) {
  const [bio, setBio] = useState(biography || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    // This effect ensures that if the server-provided `biography` prop changes
    // (e.g., after a refresh), the local `bio` state is updated, but only
    // when not in edit mode to avoid overwriting the user's input.
    if (!isEditing) {
      setBio(biography || "");
    }
  }, [biography, isEditing]);

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    const result = await updateBiography(bio);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setIsEditing(false); // Exit edit mode on successful save
      // Instead of relying on a success message, we refresh the page.
      // This will cause the parent Server Component to re-fetch the data
      // and pass down the updated biography prop.
      router.refresh();
      // setLoading will implicitly be false after the refresh completes and the component re-renders.
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setBio(biography || "");
    setError(null);
  };

  return (
    <div className={styles.biographySection}>
      {isEditing ? (
        <>
          <textarea
            className={styles.textarea}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
          />
          <div className={styles.actions}>
            <button
              className={styles.button}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              className={`${styles.button} ${styles.cancelButton}`}
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <div className={styles.displayMode}>
          <p className={styles.biographyText}>
            {biography || "Your biography is not set yet."}
          </p>
          <button className={styles.button} onClick={handleEdit}>
            Edit Biography
          </button>
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
