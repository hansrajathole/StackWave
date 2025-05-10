import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './Redux/Store.jsx'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from 'redux-persist/es/persistStore'
import { GoogleOAuthProvider } from "@react-oauth/google";

let persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <App />
            </GoogleOAuthProvider>
  
            
        </PersistGate>
  </Provider>
 
)
