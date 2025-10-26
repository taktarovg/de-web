/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Design Emotion Brand Colors
        'ocean': {
          DEFAULT: '#2D3E50', // Deep Ocean Blue
          50: '#E8EDF2',
          100: '#D1DBE5',
          200: '#A3B7CB',
          300: '#7593B1',
          400: '#476F97',
          500: '#2D3E50',
          600: '#243240',
          700: '#1B2530',
          800: '#121920',
          900: '#090C10',
        },
        'calm': {
          DEFAULT: '#4A90E2', // Calm Blue
          50: '#EBF4FD',
          100: '#D7E9FB',
          200: '#AFD3F7',
          300: '#87BDF3',
          400: '#5FA7EF',
          500: '#4A90E2',
          600: '#2B73D0',
          700: '#1F559D',
          800: '#14376A',
          900: '#0A1C37',
        },
        'sage': {
          DEFAULT: '#68B0AB', // Sage Green
          50: '#EEF7F6',
          100: '#DDEFED',
          200: '#BBDFDB',
          300: '#99CFC9',
          400: '#77BFB7',
          500: '#68B0AB',
          600: '#4D948F',
          700: '#3A6F6B',
          800: '#274A47',
          900: '#142524',
        },
        'rose': {
          DEFAULT: '#E8B4B8', // Soft Rose
          50: '#FCF6F7',
          100: '#F9EDEE',
          200: '#F3DBDD',
          300: '#EDC9CC',
          400: '#E7B7BB',
          500: '#E8B4B8',
          600: '#D98A90',
          700: '#C7666D',
          800: '#A5474D',
          900: '#7A3438',
        },
        'cloud': {
          DEFAULT: '#F7F9FC', // Cloud White
          50: '#FFFFFF',
          100: '#FCFDFE',
          200: '#F7F9FC',
          300: '#E8EDF4',
          400: '#D9E1EC',
          500: '#CAD5E4',
        },
        'midnight': {
          DEFAULT: '#1A1F2E', // Midnight
          50: '#3D4556',
          100: '#353A49',
          200: '#2D323F',
          300: '#252935',
          400: '#1D212B',
          500: '#1A1F2E',
          600: '#151924',
          700: '#10131A',
          800: '#0B0D11',
          900: '#060708',
        },
        'amber': {
          DEFAULT: '#F4A261', // Warm Amber
          50: '#FEF6F0',
          100: '#FDEDE1',
          200: '#FBDBC3',
          300: '#F9C9A5',
          400: '#F7B787',
          500: '#F4A261',
          600: '#F08539',
          700: '#E86411',
          800: '#B84E0D',
          900: '#883A0A',
        },
        'coral': {
          DEFAULT: '#E76F51', // Coral Red
          50: '#FCF1EE',
          100: '#F9E3DD',
          200: '#F3C7BB',
          300: '#EDAB99',
          400: '#E78F77',
          500: '#E76F51',
          600: '#DF4C28',
          700: '#B33A1D',
          800: '#872C16',
          900: '#5B1D0F',
        },
        
        // shadcn/ui compatibility
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
