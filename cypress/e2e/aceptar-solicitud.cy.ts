describe('Aceptar solicitud de arriendo', () => {
  const propiedadId = 777;
  const solicitudId = 123;

  const arrendador = {
    arrendadorId: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    correo: 'juan@javeriana.edu.co',
    cuenta: { cuentaId: 1, tipo: 'ARRENDADOR' }
  };

  const solicitudMock = [
    {
      solicitudId,
      fechaInicio: '2025-06-20',
      fechaFin: '2025-06-23',
      cantidadPer: 2,
      costoTotal: 300000,
      status: 'INACTIVE',
      arrendatario: {
        arrendatarioId: 3,
        nombre: 'Laura',
        apellido: 'Gómez',
        correo: 'laura@javeriana.edu.co'
      },
      propiedad: { propiedadId }
    }
  ];

  beforeEach(() => {
    localStorage.setItem('jwt', 'jwt-fake-token');
    localStorage.setItem('user', JSON.stringify(arrendador));

    cy.intercept('GET', `**/Solicitud/propiedad/${propiedadId}?arrendadorId=${arrendador.arrendadorId}`, solicitudMock).as('getSolicitudes');
    cy.intercept('GET', '**/Pago', []).as('getPagos');

    cy.visit(`/propiedad/${propiedadId}/solicitudes`);
    cy.wait('@getSolicitudes');
  });

  it('Debe aceptar la solicitud correctamente', () => {
    cy.intercept('PUT', `**/Solicitud/aceptar/${solicitudId}`, {
      ...solicitudMock[0],
      status: 'ACTIVE'
    }).as('aceptarSolicitud');

    cy.contains('Aceptar solicitud').click();
    cy.wait('@aceptarSolicitud');

    cy.contains('Aceptada').should('be.visible');
    cy.contains('Rechazar solicitud').should('be.disabled');
  });
});
