import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cambia 'tu-usuario' y 'tu-repositorio' por tu información real.
export default defineConfig({
  plugins: [react()],
  base: '/vacation-manager/', // Asegúrate de incluir la barra final
});
