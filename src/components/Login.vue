<template>
  <v-container fluid fill-height class="login-container">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Inicio de Sesión</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="loginForm" v-model="valid" lazy-validation>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                prepend-icon="mdi-email"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :rules="passwordRules"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                label="Contraseña"
                prepend-icon="mdi-lock"
                required
                @click:append="showPassword = !showPassword"
              ></v-text-field>

              <v-checkbox
                v-model="rememberMe"
                label="Recordarme"
                color="primary"
                hide-details
                class="mt-0"
              ></v-checkbox>

              <v-alert
                v-if="errorMessage"
                type="error"
                dense
                outlined
                class="mt-4"
              >
                {{ errorMessage }}
              </v-alert>

              <v-alert
                v-if="successMessage"
                type="success"
                dense
                outlined
                class="mt-4"
              >
                {{ successMessage }}
              </v-alert>

            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="login"
              :disabled="!valid"
              :loading="loading"
            >
              Iniciar Sesión
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'El e-mail es requerido',
        v => /.+@.+\..+/.test(v) || 'El e-mail debe ser válido',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'La contraseña es requerida',
        v => (v && v.length >= 6) || 'La contraseña debe tener al menos 6 caracteres',
      ],
      showPassword: false,
      rememberMe: false,
      loading: false,
      errorMessage: '',
      successMessage: '',
    };
  },
  methods: {
    async login() {
      // Valida el formulario
      if (this.$refs.loginForm.validate()) {
        this.loading = true;
        this.errorMessage = '';
        this.successMessage = '';

        // Aquí iría tu lógica de autenticación real
        // Por ejemplo, una llamada a una API
        try {
          // Simulación de una llamada a la API
          await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos

          // Simula un login exitoso o fallido
          const isSuccess = Math.random() > 0.3; // 70% de éxito, 30% de fallo para demostración

          if (isSuccess) {
            this.successMessage = '¡Inicio de sesión exitoso! Redireccionando...';
            // Aquí puedes redirigir al usuario
            // this.$router.push('/dashboard');
          } else {
            this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
          }
        } catch (error) {
          this.errorMessage = 'Hubo un error al intentar iniciar sesión. Por favor, inténtalo más tarde.';
          console.error('Error de login:', error);
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  /* SOLUCIÓN: Usamos Flexbox para centrar dentro del contenedor que ocupa el 100% de la altura */
  min-height: 100vh; /* Asegura que ocupe toda la altura de la pantalla (SOLUCIÓN ANTERIOR) */
  padding: 0; 
  margin: 0;
  
  /* **AJUSTES DE CENTRADO ADICIONALES** */
  display: flex; /* Habilita el modelo Flexbox */
  align-items: center; /* Centra verticalmente el contenido (v-row) */
  justify-content: center; /* Centra horizontalmente el contenido (v-row) */
  
  /* Tu estilo de fondo degradado */
  background: linear-gradient(to right, #6a11cb 0%, #2575fc 100%); 
}
.v-card {
  border-radius: 12px; /* Bordes más suaves */
}
</style>