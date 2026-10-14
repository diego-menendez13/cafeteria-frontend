import React, { useState, useEffect } from 'react';
import { api } from '../api';

function FormularioVenta({ onSaved, onCancel }) {
  const [formData, setFormData] = useState({ estudiante_id: '', producto_id: '', cantidad: 1, fecha: new Date().toISOString().split('T')[0] });
  const [estudiantes, setEstudiantes] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api.get('/estudiantes').then(res => setEstudiantes(res.data));
    api.get('/productos').then(res => setProductos(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/ventas', {
      estudiante_id: Number(formData.estudiante_id), producto_id: Number(formData.producto_id),
      cantidad: Number(formData.cantidad), fecha: formData.fecha
    }).then(res => { alert(res.data.message); onSaved(); });
  };

  return (
    <div className="cyber-panel">
      <div className="panel-title">
        <h2>📝 INGRESAR NUEVA TRANSACCIÓN</h2>
        <button className="close-btn" onClick={onCancel}>X</button>
      </div>
      <form onSubmit={handleSubmit} className="cyber-form">
        <label>OPERADOR (Estudiante)
          <select name="estudiante_id" value={formData.estudiante_id} onChange={(e) => setFormData({...formData, estudiante_id: e.target.value})} required>
            <option value="">-- SELECCIONAR --</option>
            {estudiantes.map(e => <option key={e.id} value={e.id}>{e.nombre} [{e.grupo}]</option>)}
          </select>
        </label>
        <label>ITEM (Producto)
          <select name="producto_id" value={formData.producto_id} onChange={(e) => setFormData({...formData, producto_id: e.target.value})} required>
            <option value="">-- SELECCIONAR --</option>
            {productos.map(p => <option key={p.id} value={p.id}>{p.nombre} - ${p.precio}</option>)}
          </select>
        </label>
        <div className="form-row">
          <label>CANTIDAD
            <input type="number" name="cantidad" min="1" value={formData.cantidad} onChange={(e) => setFormData({...formData, cantidad: e.target.value})} required />
          </label>
          <label>FECHA
            <input type="date" name="fecha" value={formData.fecha} onChange={(e) => setFormData({...formData, fecha: e.target.value})} required />
          </label>
        </div>
        <div className="form-actions">
          <button type="button" className="cyber-btn secondary" onClick={onCancel}>CANCELAR</button>
          <button type="submit" className="cyber-btn">TRANSMITIR DATOS</button>
        </div>
      </form>
    </div>
  );
}
export default FormularioVenta;