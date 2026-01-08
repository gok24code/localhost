import { createSupabaseServerClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import styles from "./Navbar.module.css";

export default function LogoutButton() {

  const signOut = async () => {
    "use server";
    const supabase = createSupabaseServerClient();
    await supabase.auth.signOut();
    revalidatePath("/", "layout");
    redirect("/");
  };

  return (
    <form action={signOut}>
      <button type="submit" className={styles.logoutButton}>
        Logout
      </button>
    </form>
  );
}
