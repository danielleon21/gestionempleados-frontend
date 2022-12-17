import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Agregar from './layout/empleados/Agregar';
import Editar from './layout/empleados/Editar';

function App() {
    return (
        <div className="App">
            <Router >
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/agregarEmpleado" element={<Agregar />} />
                    <Route exact path='/editarEmpleado/:id' element={<Editar />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
