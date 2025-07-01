import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import 'font-awesome/css/font-awesome.min.css';
import './index.css'
import App from './App.jsx'
import AllRoutes from "./routes/AllRoutes.jsx"
import {Provider} from "react-redux"
import store from "./store/store"



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AllRoutes />
  </Provider>
)
