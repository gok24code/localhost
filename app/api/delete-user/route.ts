import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()

  // 1. Get the current user from the session
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const user = session?.user

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 2. Get the password from the request body
  const { password } = await req.json()
  if (!password) {
    return NextResponse.json({ error: 'Password is required' }, { status: 400 })
  }

  // 3. Verify the user's password by trying to sign in with it.
  // This is a workaround to reauthenticate the user on the server.
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: password,
  })

  if (signInError) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  // 4. If password is correct, create an admin client and delete the user
  // IMPORTANT: The service_role key must be set in your .env.local and Vercel env vars
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
    user.id
  )

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Account deleted successfully' })
}
