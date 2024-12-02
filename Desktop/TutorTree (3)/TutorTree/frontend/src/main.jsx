import { StrictMode } from 'react' // Import StrictMode to help identify potential issues during development
import { createRoot } from 'react-dom/client' 
import App from './App.jsx' 
import { BrowserRouter } from 'react-router-dom' 
import AppContextProvider from './context/AppContext.jsx' 

// Rendering the root of the app
createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
    <AppContextProvider> 
      <App />
    </AppContextProvider>
  </BrowserRouter>
)
