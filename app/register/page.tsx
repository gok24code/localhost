"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";
import styles from "./page.module.css";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!username || !email || !password) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_name: username,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      // Optionally, you can redirect the user after a few seconds
      setTimeout(() => {
        router.push("/login"); // Assuming you have a login page
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Create Your Account</h1>
        <p className={styles.subtitle}>
          Join TheLocalHost community today.
        </p>

        {success ? (
          <div className={styles.successMessage}>
            <p>Registration successful!</p>
            <p>Please check your email to verify your account. Redirecting to login...</p>
          </div>
        ) : (
          <form onSubmit={handleRegister} className={styles.form}>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.inputGroup}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your unique username"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? "Registering..." : "Create Account"}
            </button>
          </form>
        )}

        <p className={styles.loginLink}>
          Already have an account? <Link href="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}
