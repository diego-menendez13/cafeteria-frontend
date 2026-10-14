import { useState } from 'react';
import ListaVentas from './components/ListaVentas';
import FormularioVenta from './components/FormularioVenta';
import './App.css';

function App() {
  const [vista, setVista] = useState('lista');
  return (
    <div className="app-cyber">
      <header className="hud-header">
        <div className="hud-logo"> CYBER CAFETERIA v2.0</div>
        <div className="hud-status">SYSTEM: ONLINE</div>
      </header>
      <main className="hud-main">
        {vista === 'lista' && <ListaVentas onAgregar={() => setVista('formulario')} />}
        {vista === 'formulario' && (
          <FormularioVenta onSaved={() => setVista('lista')} onCancel={() => setVista('lista')} />
        )}
      </main>
      <footer className="hud-footer">
        <p>© 2026 INFRAMEN // SECURE CONNECTION ESTABLISHED</p>
      </footer>
    </div>
  );
}
export default App;