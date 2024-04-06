import { PUBLIC_BACKEND_URL } from '$env/static/public'
import fetch from 'node-fetch'
export const actions = {
  signUp: async ({ request, cookies, locals }) => {
    cookies.delete('__Secure-next-auth.callback-url', { path: '/'})
    cookies.delete('__Host-next-auth.csrf-token', { path: '/'})
    cookies.delete('next-auth.callback-url', { path: '/'})
    cookies.delete('next-auth.csrf-token', { path: '/'})
    const values = await request.formData()
    const email = values.get("email")
    const password = values.get("password")
    const username = values.get("username")

    const result = await fetch(`${PUBLIC_BACKEND_URL}:3000/api/auth/createUser`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        username
      }), 
      headers: {
        'content-type': 'application/json'
      },
    })

    try {
      const parsed = await result.json() as {token: string, user: {email:string, username: string}}
      cookies.set('jwt-token', parsed.token, {path: '/'})
      const { email, username } = parsed.user
      locals.session = {user: {email, username}}
    } catch(err) {
      console.log(err)
    }
  }
}

export const load = async (event) => {
  const session = event.locals.session
  return {
    session
  }
}