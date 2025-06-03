describe('Mis Solicitudes de Arriendo', () => {
  const arrendatario = {
    arrendatarioId: 123,
    nombre: 'Camila',
    apellido: 'Suárez',
    correo: 'camila@javeriana.edu.co',
    cuenta: { cuentaId: 50, tipo: 'ARRENDATARIO' }
  };

  const mockSolicitudes = [
    {
      solicitudId: 1,
      fechaInicio: '2025-06-15',
      fechaFin: '2025-06-18',
      cantidadPer: 4,
      costoTotal: 600000,
      status: 'INACTIVE',
      propiedad: {
        propiedadId: 10,
        nombre: 'Casa del Sol'
      }
    },
    {
      solicitudId: 2,
      fechaInicio: '2025-07-01',
      fechaFin: '2025-07-05',
      cantidadPer: 2,
      costoTotal: 800000,
      status: 'ACTIVE',
      propiedad: {
        propiedadId: 11,
        nombre: 'Villa Palmeras'
      }
    },
    {
      solicitudId: 3,
      fechaInicio: '2025-08-10',
      fechaFin: '2025-08-12',
      cantidadPer: 1,
      costoTotal: 300000,
      status: 'DELETED',
      propiedad: {
        propiedadId: 12,
        nombre: 'Cabaña El Bosque'
      }
    }
  ];

  beforeEach(() => {
    localStorage.setItem('jwt', 'fake-jwt-token');
    localStorage.setItem('user', JSON.stringify(arrendatario));

    cy.intercept('GET', '**/Solicitud/misSolicitudes', mockSolicitudes).as('getSolicitudes');
    cy.intercept('GET', '**/Pago', []).as('getPagos'); // No hay pagos para simplificar
  });

  it('Debe mostrar todas las solicitudes con sus estados y enlaces', () => {
    cy.visit('/mis-solicitudes');
    cy.wait('@getSolicitudes');

    // Verificamos que haya 3 tarjetas de solicitudes
    cy.get('app-solicitud-card').should('have.length', 3);

    // Verifica contenido de cada tarjeta
    cy.contains('Casa del Sol').should('exist');
    cy.contains('Villa Palmeras').should('exist');
    cy.contains('Cabaña El Bosque').should('exist');

    // Verifica los textos de estado
    cy.contains('En espera').should('exist');
    cy.contains('Aceptado').should('exist');
    cy.contains('Rechazado').should('exist');

    // Verifica enlaces a propiedades
    cy.get('.detalle-link').should('have.length', 3);
  });
});
