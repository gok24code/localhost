"use client";

import { useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
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

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from("profiles")
        .update({ biography: bio })
        .eq("id", user.id);

      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
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
