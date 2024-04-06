// import { PUBLIC_BACKEND_URL } from '$env/static/public'
import type { ServerLoadEvent } from '@sveltejs/kit';
/** @type {import('./$types').LayoutServerLoad} */
export const load = async (event: ServerLoadEvent) => {
  const session = event.locals.session
  return {
    session,
  }
}
