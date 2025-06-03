/// <reference types="cypress" />

describe('Pago de solicitud', () => {
  const solicitudId = 456;

  const arrendatario = {
    arrendatarioId: 33,
    nombre: 'María',
    apellido: 'Pérez',
    correo: 'maria@javeriana.edu.co',
    telefono: '3100000000',
    status: 'ACTIVE',
    cuenta: {
      cuentaId: 15,
      usuario: 'maria@javeriana.edu.co',
      tipo: 'ARRENDATARIO',
      status: 'ACTIVE'
    }
  };

  beforeEach(() => {
    // Simula que está logueado como arrendatario
    localStorage.setItem('jwt', 'token-falso');
    localStorage.setItem('user', JSON.stringify(arrendatario));

    // Interceptar la solicitud a /Solicitud/456
    cy.intercept('GET', '**/Solicitud/456', {
      solicitudId,
      fechaInicio: '2025-07-01',
      fechaFin: '2025-07-03',
      cantidadPer: 4,
      costoTotal: 400000,
      status: 'ACTIVE',
      arrendatario,
      propiedad: {
        propiedadId: 77,
        nombre: 'Casa Playa',
      }
    }).as('getSolicitud');

    // Interceptar POST del pago (respuesta falsa)
    cy.intercept('POST', '**/Pago', {
      pagoId: 123,
      banco: 'BANCOLOMBIA',
      numeroCuenta: '123456789',
      solicitud: { solicitudId }
    }).as('crearPago');
  });

  it('Debería realizar el pago de la solicitud exitosamente', () => {
    cy.visit(`/solicitud/${solicitudId}/pagar`);
    cy.wait('@getSolicitud');

    // Llenar formulario de pago
    cy.get('select[formcontrolname="banco"]').select('BANCOLOMBIA');
    cy.get('input[formcontrolname="numCuenta"]').type('123456789');
    cy.get('button[type="submit"]').click();

    // Confirmar que se muestra el mensaje de éxito
    cy.contains('Pago registrado con éxito.').should('be.visible');
  });
});
