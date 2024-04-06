import { PUBLIC_BACKEND_URL } from '$env/static/public'

export const load = async (event) => {
  const session = event.locals.session
  const backend_uri = PUBLIC_BACKEND_URL 
  return {
    backend_uri,
    session,
  }
}