describe('Solicitudes por Propiedad (como arrendador)', () => {
  const propiedadId = 999; // Simulación de propiedad con solicitudes

  const arrendador = {
    arrendadorId: 777,
    nombre: 'Mario',
    apellido: 'Gómez',
    correo: 'mario@javeriana.edu.co',
    cuenta: { cuentaId: 40, tipo: 'ARRENDADOR' }
  };

  const mockSolicitudes = [
    {
      solicitudId: 100,
      fechaInicio: '2025-07-01',
      fechaFin: '2025-07-04',
      cantidadPer: 3,
      costoTotal: 500000,
      status: 'INACTIVE',
      arrendatario: {
        arrendatarioId: 10,
        nombre: 'Laura',
        apellido: 'Zapata',
        correo: 'laura@javeriana.edu.co'
      },
      propiedad: { propiedadId }
    },
    {
      solicitudId: 101,
      fechaInicio: '2025-08-01',
      fechaFin: '2025-08-03',
      cantidadPer: 2,
      costoTotal: 300000,
      status: 'ACTIVE',
      arrendatario: {
        arrendatarioId: 11,
        nombre: 'Carlos',
        apellido: 'Pérez',
        correo: 'carlos@javeriana.edu.co'
      },
      propiedad: { propiedadId }
    }
  ];

  beforeEach(() => {
    localStorage.setItem('jwt', 'fake-jwt-token');
    localStorage.setItem('user', JSON.stringify(arrendador));

    cy.intercept('GET', `**/Solicitud/propiedad/${propiedadId}?arrendadorId=${arrendador.arrendadorId}`, mockSolicitudes).as('getSolicitudes');
    cy.intercept('GET', '**/Pago', []).as('getPagos'); // Ningún pago aún
  });

  it('Debe mostrar todas las solicitudes activas para una propiedad', () => {
    cy.visit(`/propiedad/${propiedadId}/solicitudes`);
    cy.wait('@getSolicitudes');

    // Asegurarse de que se rendericen dos tarjetas de solicitud
    cy.get('app-solicitud-propiedad-card').should('have.length', 2);

    // Verificamos nombres de arrendatarios
    cy.contains('Laura Zapata').should('exist');
    cy.contains('Carlos Pérez').should('exist');

    // Verifica que se muestren los botones de aceptar y rechazar para INACTIVE
    cy.contains('Aceptar solicitud').should('be.visible');
    cy.contains('Rechazar solicitud').should('be.visible');

    // Verifica estado "Aceptada" para la solicitud ACTIVE
    cy.contains('Aceptada').should('be.visible');
  });
});
