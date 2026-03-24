import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import ScrollToTop from './Components/ScrollToTop.jsx'
import { AuthProvider } from './Context/authContext.jsx'


createRoot(document.getElementById('root')).render(



  <BrowserRouter>
    <AuthProvider>
      <ScrollToTop />
      <App />
    </AuthProvider>

  </BrowserRouter>




)
