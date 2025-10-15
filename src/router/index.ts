/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

// --- 1. Función para verificar si hay token ---
const isAuthenticated = (): boolean => {
  // Retorna true si existe un 'token' en el Local Storage
  return !!localStorage.getItem('token')
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// --- 2. Implementación del Router Guard (beforeEach) ---
router.beforeEach((to, from, next) => {
  // Verifica si la ruta a la que se intenta acceder NO es la raíz ('/') Y NO está autenticado
  if (to.path !== '/' && !isAuthenticated()) {
    console.warn('Acceso denegado. Redirigiendo a login.')
    // Redirige al usuario a la ruta de login (que es la raíz '/')
    next('/') 
  } else {
    // Si está autenticado o la ruta es la de login, continúa la navegación normal
    next() 
  }
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router