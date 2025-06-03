/// <reference types="cypress" />

describe('Calificar Arrendatario', () => {
  const cuentaId = 222;

  beforeEach(() => {
    // Simular login como arrendador
    const arrendador = {
      arrendadorId: 10,
      nombre: 'Carlos',
      apellido: 'Gómez',
      correo: 'carlos@javeriana.edu.co',
      telefono: '3111111111',
      status: 'ACTIVE',
      cuenta: {
        cuentaId,
        usuario: 'carlos@javeriana.edu.co',
        tipo: 'ARRENDADOR',
        status: 'ACTIVE'
      }
    };

    localStorage.setItem('jwt', 'token-falso');
    localStorage.setItem('user', JSON.stringify(arrendador));

    // Interceptar el POST para crear calificación
    cy.intercept('POST', '**/Calificacion', {
      statusCode: 200,
      body: {
        calificacionId: 1,
        estrellas: 4,
        comentario: 'Buen arrendatario',
        cuenta: { cuentaId }
      }
    }).as('crearCalificacion');
  });

  it('Debería enviar una calificación al arrendatario exitosamente', () => {
    cy.visit(`/arrendatario/${cuentaId}/calificar`);

    // Selecciona 4 estrellas
    cy.get('.star-rating span').eq(3).click();

    // Escribe comentario
    cy.get('textarea[formControlName="comentario"]').type('Todo estuvo perfecto. Muy buen comportamiento.');

    // Enviar formulario
    cy.get('button[type="submit"]').click();

    // Esperar petición y mensaje de éxito
    cy.wait('@crearCalificacion');
    cy.contains('¡Gracias por tu calificación!').should('be.visible');
  });
});
