import './assets/libs/boxicons-2.1.1/css/boxicons.min.css'
import './scss/App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Blank from './pages/Blank'
import Dashboard from './pages/Dashboard'
import MainLayout from './layout/MainLayout'
import CreateMascotas from './components/CreateProducts';
import EditMascotas from './components/EditProducts';
import MAP from './components/map';
import Solicitudes from './pages/solicitudes'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="orders" element={<Blank />} />
                    <Route path="products" element={<Blank />} />
                    <Route path="create" element={<CreateMascotas/>} />
                    <Route path="edit/:mascota_id" element={<EditMascotas/>} />
                    <Route path="Map" element={<MAP/>} />
                    <Route path="solicitudes" element={<Solicitudes/>} />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
