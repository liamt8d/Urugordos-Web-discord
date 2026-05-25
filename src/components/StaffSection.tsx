const staff = [
  { nombre: 'Usuario', rol: 'Rol del staff', avatar: '/assets/ugblanco.svg' },
  { nombre: 'Usuario', rol: 'Rol del staff', avatar: '/assets/ugblanco.svg' },
  { nombre: 'Usuario', rol: 'Rol del staff', avatar: '/assets/ugblanco.svg' },
  { nombre: 'Usuario', rol: 'Rol del staff', avatar: '/assets/ugblanco.svg' },
]

export default function StaffSection() {
  return (
    <section className="section">
      <div className="section-header">
        <span className="section-badge">Equipo</span>
        <h2 className="section-title">Conoce al <span className="highlight">Staff</span></h2>
        <p className="section-sub">Las personas que hacen posible esta comunidad.</p>
      </div>
      <div className="staff-grid">
        {staff.map((m, i) => (
          <div key={i} className="staff-card">
            <img src={m.avatar} alt={m.nombre} className="staff-avatar" />
            <h3 className="staff-nombre">{m.nombre}</h3>
            <p className="staff-rol">{m.rol}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
