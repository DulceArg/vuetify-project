<template>
  <v-layout full-height>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>My files</v-toolbar-title>

      <template v-if="$vuetify.display.mdAndUp">
        <v-btn icon="mdi-magnify" variant="text"></v-btn>
        <v-btn icon="mdi-filter" variant="text"></v-btn>
      </template>

      <v-btn icon="mdi-logout" variant="text" @click="logout"></v-btn>
      <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :location="$vuetify.display.mobile ? 'bottom' : undefined"
      temporary
      width="250"
    >
      <v-list :items="items"></v-list>
      
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="error" @click="logout">Cerrar Sesión</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main class="d-flex align-center justify-center">
      <v-card-text class="text-h6">
        El contenido de la aplicación debe aparecer aquí.
      </v-card-text>
      
      </v-main>
  </v-layout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'; // Necesario para la función logout

const items = [
  { title: 'Foo', value: 'foo' },
  { title: 'Bar', value: 'bar' },
  { title: 'Fizz', value: 'fizz' },
  { title: 'Buzz', value: 'buzz' },
]

const drawer = ref(true) // Cambiamos a 'true' para que se muestre al inicio en desktop
const group = ref(null)

const router = useRouter(); // Instancia del router

// Lógica de logout para cerrar la sesión
const logout = () => {
    localStorage.removeItem('token');
    router.push('/');
}

watch(group, () => {
  drawer.value = false
})
</script>