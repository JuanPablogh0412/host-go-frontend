describe('Calificar Propiedad (Finca)', () => {
  const propiedadId = 99;

  beforeEach(() => {
    // Simula que está logueado
    const usuario = {
      arrendatarioId: 20,
      nombre: 'Sandra',
      apellido: 'Ramírez',
      correo: 'sandra@javeriana.edu.co',
      telefono: '3201234567',
      status: 'ACTIVE',
      cuenta: {
        cuentaId: 44,
        usuario: 'sandra@javeriana.edu.co',
        tipo: 'ARRENDATARIO',
        status: 'ACTIVE'
      }
    };

    localStorage.setItem('jwt', 'token-falso');
    localStorage.setItem('user', JSON.stringify(usuario));

    // Interceptamos el POST de la calificación
    cy.intercept('POST', '**/CaliPropiedad', {
      statusCode: 200,
      body: {
        caliPropiedadId: 1,
        estrellas: 5,
        comentario: 'Excelente propiedad',
        propiedad: { propiedadId }
      }
    }).as('crearCalificacion');
  });

  it('Debería enviar una calificación correctamente', () => {
    cy.visit(`/propiedad/${propiedadId}/calificar`);

    // Cambiar a 4 estrellas
    cy.get('.star-rating span').eq(3).click();

    // Escribir comentario
    cy.get('textarea[formControlName="comentario"]').type('Muy bonita finca, todo estuvo limpio.');

    // Enviar
    cy.get('button[type="submit"]').click();

    // Esperar la petición y verificar mensaje de éxito
    cy.wait('@crearCalificacion');
    cy.contains('¡Gracias por tu calificación!').should('exist');
  });
});
