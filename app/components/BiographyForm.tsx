"use client";

import { useEffect, useState } from "react";
import { updateBiography } from "@/app/actions/updateBiography";
import styles from "./BiographyForm.module.css";

export default function BiographyForm({ biography }: { biography: string | null }) {
  const [bio, setBio] = useState(biography || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setBio(biography || "");
    }
  }, [biography, isEditing]);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const result = await updateBiography(bio);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setIsEditing(false); // Exit edit mode on successful save
    }
    setLoading(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setError(null); // Clear any previous errors when starting to edit
    setSuccess(false); // Clear success message when starting to edit
  };

  const handleCancel = () => {
    setIsEditing(false);
    setBio(biography || ""); // Revert to the original biography
    setError(null); // Clear any errors
    setSuccess(false); // Clear success message
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
      {success && <p className={styles.success}>Biography saved!</p>}
    </div>
  );
}
