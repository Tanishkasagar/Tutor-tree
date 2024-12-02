// Importing React library for building the user interface
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider from './context/AdminContext.jsx'
import TutorContextProvider from './context/TutorContext.jsx'
import AppContextProvider from './context/AppContext.jsx'

// Rendering the app into the root element of the DOM
ReactDOM.createRoot(document.getElementById('root')).render(
  // Wrapping the entire app with BrowserRouter for routing functionality
  <BrowserRouter>
    <AdminContextProvider>
      <TutorContextProvider>
        {/* Wrapping with AppContextProvider to provide global app context */}
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </TutorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>,
)
