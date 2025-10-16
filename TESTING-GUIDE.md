# 🧪 Guía de Testing: Login Modal

## 📋 Checklist de Pruebas

### ✅ Prueba 1: Acceso sin autenticación
1. Abre el navegador en modo incógnito
2. Ve a `http://localhost:3000/es/dashboard`
3. **Resultado esperado**: Debe aparecer el modal de login sobre la página con blur
4. **❌ No debe**: Redirigir a `/es/auth/login` como página completa

### ✅ Prueba 2: Login con quick buttons
1. En el modal, haz click en "👑 Admin"
2. **Resultado esperado**: 
   - Login exitoso
   - Modal se cierra
   - Quedas en `/es/dashboard`
   - Ves el dashboard del admin

### ✅ Prueba 3: Acceso a subrutas
1. Sin estar autenticado
2. Ve a `http://localhost:3000/es/dashboard/students`
3. **Resultado esperado**: Modal de login aparece sobre la página
4. Haz login con "🎓 Student"
5. **Resultado esperado**: Quedas en `/es/dashboard/students`

### ✅ Prueba 4: Logout desde dashboard
1. Estando autenticado en el dashboard
2. Click en botón "Logout"
3. **Resultado esperado**: 
   - Modal de login aparece sobre la página actual
   - El fondo muestra el dashboard con blur
   - **NO** navega a página completa

### ✅ Prueba 5: Cerrar modal con X
1. Estando en el modal de login
2. Click en el botón X (esquina superior derecha)
3. **Resultado esperado**: Modal se cierra (vuelves atrás)

### ✅ Prueba 6: Cerrar modal con backdrop
1. Estando en el modal de login
2. Click fuera del card (en el área con blur)
3. **Resultado esperado**: Modal se cierra (vuelves atrás)

### ✅ Prueba 7: URL directa al login
1. Escribe directamente: `http://localhost:3000/es/auth/login`
2. **Resultado esperado**: 
   - Se muestra la página completa de login
   - **NO** como modal (comportamiento correcto)

### ✅ Prueba 8: Refresh en login modal
1. Abre el modal de login desde dashboard
2. Presiona F5 para refrescar
3. **Resultado esperado**: 
   - Se muestra la página completa de login
   - (Comportamiento correcto de Next.js)

### ✅ Prueba 9: Cambio de idioma
1. Abre modal de login desde `/es/dashboard`
2. **Resultado esperado**: URL mantiene `/es/`
3. Haz login
4. **Resultado esperado**: Sigues en `/es/dashboard`

### ✅ Prueba 10: Navegación con browser back
1. Dashboard → Click logout → Modal aparece
2. Presiona botón "Atrás" del navegador
3. **Resultado esperado**: Modal se cierra

## 🐛 Problemas Comunes y Soluciones

### Problema: Modal no aparece, navega a página completa
**Causa**: El intercepting route no está configurado correctamente
**Solución**: Verificar que existe:
- `app/[locale]/dashboard/@modal/(.)auth/login/page.tsx`
- `app/[locale]/dashboard/@modal/default.tsx`
- Layout acepta prop `modal`

### Problema: Al hacer logout, navega a página completa
**Causa**: El `router.push` en logout está siendo directo
**Solución**: Usar `router.refresh()` en lugar de `router.push('/auth/login')`

### Problema: El modal no se cierra después del login
**Causa**: El `onSuccess` callback no está configurado
**Solución**: Verificar que `LoginForm` tenga prop `onSuccess` y se ejecute `router.back()`

### Problema: Error "Modal is not defined"
**Causa**: El layout no está recibiendo el prop `modal`
**Solución**: Verificar que `layout.tsx` tenga:
```tsx
export default function Layout({ children, modal }) {
  return (
    <>
      {children}
      {modal}
    </>
  )
}
```

## 🎨 Verificación Visual

### Modal correcto debe tener:
- ✅ Fondo borroso (blur fuerte)
- ✅ Overlay oscuro semitransparente
- ✅ Card centrado con sombra pronunciada
- ✅ Botón X visible en esquina superior derecha
- ✅ 3 botones quick login visibles
- ✅ Animación suave al aparecer

### Página completa (no modal) tiene:
- ✅ Fondo normal sin blur
- ✅ Solo el card de login
- ✅ No hay contenido de dashboard detrás

## 📊 Tabla de Verificación

| Test | Descripción | Estado |
|------|-------------|---------|
| 1 | Acceso sin auth muestra modal | ⬜ |
| 2 | Quick login funciona | ⬜ |
| 3 | Subrutas muestran modal | ⬜ |
| 4 | Logout muestra modal | ⬜ |
| 5 | Cerrar con X funciona | ⬜ |
| 6 | Cerrar con backdrop funciona | ⬜ |
| 7 | URL directa muestra página | ⬜ |
| 8 | Refresh muestra página | ⬜ |
| 9 | Idioma se mantiene | ⬜ |
| 10 | Browser back funciona | ⬜ |

## 🚀 Testing Automatizado (Opcional)

```typescript
// tests/login-modal.spec.ts
import { test, expect } from '@playwright/test';

test('login modal appears when accessing protected route', async ({ page }) => {
  await page.goto('/es/dashboard');
  
  // Verificar que el modal está presente
  await expect(page.locator('[role="dialog"]')).toBeVisible();
  
  // Verificar backdrop blur
  const backdrop = page.locator('.backdrop-blur-lg');
  await expect(backdrop).toBeVisible();
  
  // Click en quick login
  await page.click('text=Admin');
  
  // Verificar que el modal se cierra
  await expect(page.locator('[role="dialog"]')).not.toBeVisible();
  
  // Verificar que estamos en dashboard
  await expect(page).toHaveURL(/.*\/dashboard$/);
});
```

---

**✅ Completa esta checklist para verificar que todo funciona correctamente**
