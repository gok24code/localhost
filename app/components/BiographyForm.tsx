"use client";

import { useState } from "react";
import { updateBiography } from "@/app/actions/updateBiography";
import styles from "./BiographyForm.module.css";

export default function BiographyForm({ biography }: { biography: string | null }) {
  const [bio, setBio] = useState(biography || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const result = await updateBiography(bio);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div>
      <textarea
        className={styles.textarea}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Tell us about yourself..."
      />
      <button
        className={styles.button}
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? "Saving..." : "Save"}
      </button>
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>Biography saved!</p>}
    </div>
  );
}
