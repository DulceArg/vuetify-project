<template>
  <v-container class="d-flex flex-align-center justify-center full-height">
    <v-card class="v-card-min-width-300 min-width-300 elevation-7" width="500" elevation="7">
      <v-card-title>
        <div class="text-center">Iniciar Sesión</div>
      </v-card-title>

      <v-alert
        v-if="errorMessage"
        type="error"
        dismissible
        class="mb-4"
      >
        {{ errorMessage }}
      </v-alert>

      <v-card-text>
        <v-form @submit.prevent="login">
          <v-text-field
            v-model="email"
            label="Usuario (Email)"
            outlined
            clearable
            dense
            required
            class="mb-3"
          ></v-text-field>

          <v-text-field
            v-model="password"
            label="Contraseña"
            type="password"
            outlined
            clearable
            dense
            required
            class="mb-4"
          ></v-text-field>

          <v-card-actions>
            <v-btn
              color="primary"
              block
              @click="login"
            >
              Ingresar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// CORRECCIÓN: Usar la ruta absoluta (@) para la importación
// Esto asume que el alias '@' apunta a la carpeta 'src' de tu proyecto.
import axios from '@/config/axios';
import { AxiosError } from 'axios';

// --- Definición de variables reactivas (ref) ---
const email = ref('');
const password = ref('');
const errorMessage = ref('');

// Obtiene el router para la navegación
const router = useRouter();

// --- Función principal de Login ---
const login = async () => {
  try {
    // 1. Validar que los campos no estén vacíos
    if (!email.value || !password.value) {
      errorMessage.value = 'Por favor, completa todos los campos';
      return;
    }
    
    // Limpiar mensaje de error anterior
    errorMessage.value = '';

    // 2. Enviar la solicitud POST al endpoint /api/login
    const response = await axios.post('/login', {
      email: email.value,
      password: password.value,
    });

    // 3. Procesar la respuesta del servidor
    if(response.data.acceso === "Ok")
    {
      const token = response.data.token;
      
      // Almacenar el token en el Local Storage
      localStorage.setItem('token', token);
      
      // Redirigir al usuario a la ruta '/home'
      await router.push({ path: '/home' });
    }else{
      // Mostrar el error retornado directamente por el controlador de Laravel
      errorMessage.value = response.data.error;
    }
    
  } catch (err) {
    // 4. Manejar errores de red o del servidor
    
    if (err instanceof AxiosError) {
      if (err.response && err.response.data) {
        errorMessage.value = err.response.data.message || 'Error al iniciar sesión';
      } else {
        errorMessage.value = 'Error de conexión con el servidor.';
      }
    } else {
      errorMessage.value = 'Ocurrió un error inesperado. Inténtalo nuevamente.';
    }
  } 
};
</script>

<style scoped>
/* Estilo para centrar verticalmente el contenedor en la pantalla */
.full-height {
  min-height: 100vh;
}
/* Estilo para asegurar un ancho mínimo de la tarjeta */
.v-card-min-width-300 {
  min-width: 300px;
}
</style>