import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
    palette: {
        primary: {
            main: "#013e87",
        },
        secondary: {
            main: "#2e74c9",
        }
    },
    typography: {
        h1: {
            fontSize: "3rem",
            fontWeight: 600,
        },
        h2: {
            fontSize: "1.75rem",
            fontWeight: 600,
        },
        h3: {
            fontSize: "1.5rem",
            fontWeight: 600,
        },
    }
})

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider theme={theme} >
            <App />
        </ThemeProvider>
  </StrictMode>,
)
