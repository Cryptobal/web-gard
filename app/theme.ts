export const theme = {
  light: {
    // Colores primarios con más contraste
    '--gard-primary': '215 80% 35%', // Azul principal más oscuro para mejor contraste
    '--gard-primary-foreground': '0 0% 100%', // Blanco
    '--gard-secondary': '215 80% 20%', // Azul oscuro con más contraste
    '--gard-secondary-foreground': '0 0% 100%', // Blanco
    '--gard-accent': '18 100% 45%', // Naranja más oscuro
    '--gard-accent-foreground': '0 0% 100%', // Blanco

    // Colores de fondo
    '--gard-background': '0 0% 100%', // Blanco
    '--gard-foreground': '215 30% 20%', // Azul oscuro para texto con más contraste
    '--gard-muted': '220 14% 92%', // Gris claro con más contraste
    '--gard-muted-foreground': '215 30% 30%', // Azul medio para texto secundario

    // Componentes
    '--gard-card': '0 0% 100%', // Blanco
    '--gard-card-foreground': '215 30% 20%', // Azul oscuro con más contraste
    '--gard-popover': '0 0% 100%', // Blanco
    '--gard-popover-foreground': '215 30% 20%', // Azul oscuro con más contraste
    '--gard-border': '220 13% 85%', // Gris con más contraste
    '--gard-input': '220 13% 85%', // Gris con más contraste
    '--gard-ring': '215 80% 35%', // Mismo azul del primario

    // Radio
    '--radius': '0.75rem',
  },
  dark: {
    // Colores primarios - Unificados para consistencia
    '--gard-primary': '215 80% 55%', // Azul principal un poco más brillante para modo oscuro
    '--gard-primary-foreground': '0 0% 100%', // Blanco
    '--gard-secondary': '215 70% 30%', // Azul oscuro
    '--gard-secondary-foreground': '0 0% 100%', // Blanco
    '--gard-accent': '18 100% 60%', // Naranja más brillante
    '--gard-accent-foreground': '0 0% 100%', // Blanco

    // Colores de fondo
    '--gard-background': '222 47% 11%', // Azul muy oscuro
    '--gard-foreground': '210 40% 98%', // Blanco con tinte azulado
    '--gard-muted': '217 33% 17%', // Azul oscuro
    '--gard-muted-foreground': '215 20% 70%', // Gris azulado más brillante para mejor legibilidad

    // Componentes
    '--gard-card': '222 47% 14%', // Azul oscuro para cards
    '--gard-card-foreground': '210 40% 98%', // Blanco con tinte azulado
    '--gard-popover': '222 47% 14%', // Azul oscuro para popovers
    '--gard-popover-foreground': '210 40% 98%', // Blanco con tinte azulado
    '--gard-border': '217 33% 25%', // Azul oscuro para bordes
    '--gard-input': '217 33% 25%', // Azul oscuro para inputs
    '--gard-ring': '215 80% 55%', // Mismo azul del primario

    // Radio
    '--radius': '0.75rem',
  },
}; 