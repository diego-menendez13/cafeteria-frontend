import React, { useEffect, useState } from 'react';
import { api } from '../api';
import EditarVenta from './EditarVenta';

function ListaVentas({ onAgregar }) {
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(true);

  const cargarVentas = () => {
    setCargando(true);
    api.get('/ventas').then(res => setVentas(res.data)).finally(() => setCargando(false));
  };

  useEffect(() => { cargarVentas(); }, []);

  const eliminarVenta = (id) => {
    if (window.confirm('⚠️ ¿CONFIRMAR ELIMINACIÓN DE REGISTRO?')) {
      api.delete(`/ventas/${id}`).then(res => { alert(res.data.message); cargarVentas(); });
    }
  };

  if (ventaSeleccionada) {
    return <EditarVenta venta={ventaSeleccionada} onUpdate={() => { cargarVentas(); setVentaSeleccionada(null); }} onCancel={() => setVentaSeleccionada(null)} />;
  }

  const totalVentas = ventas.reduce((acc, v) => acc + Number(v.total), 0);

  return (
    <div className="dashboard">
      <div className="kpi-container">
        <div className="kpi-card">
          <span className="kpi-label">REGISTROS ACTIVOS</span>
          <span className="kpi-value">{ventas.length}</span>
        </div>
        <div className="kpi-card highlight">
          <span className="kpi-label">INGRESOS TOTALES</span>
          <span className="kpi-value">${totalVentas.toFixed(2)}</span>
        </div>
      </div>

      <div className="panel-header">
        <h2>📡 LOG DE TRANSACCIONES</h2>
        <button className="cyber-btn" onClick={onAgregar}>+ NUEVA ENTRADA</button>
      </div>

      {cargando ? <div className="loading-scan">SCANNING DATABASE...</div> : (
        <div className="cyber-table-wrapper">
          <table className="cyber-table">
            <thead>
              <tr>
                <th>ID</th><th>OPERADOR</th><th>GRUPO</th><th>ITEM</th><th>CANT</th><th>UNIT</th><th>TOTAL</th><th>FECHA</th><th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((v) => (
                <tr key={v.id}>
                  <td className="neon-id">#{v.id}</td>
                  <td>{v.estudiante}</td>
                  <td className="grupo-tag">{v.grupo}</td>
                  <td>{v.producto}</td>
                  <td>{v.cantidad}</td>
                  <td>${Number(v.precio).toFixed(2)}</td>
                  <td className="neon-total">${Number(v.total).toFixed(2)}</td>
                  <td>{new Date(v.fecha).toLocaleDateString()}</td>
                  <td className="acciones">
                    <button className="btn-edit" onClick={() => setVentaSeleccionada(v)}>EDIT</button>
                    <button className="btn-del" onClick={() => eliminarVenta(v.id)}>DEL</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default ListaVentas;