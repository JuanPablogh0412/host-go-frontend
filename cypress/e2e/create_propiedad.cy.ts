describe('Detalle de Propiedad - simulación exitosa', () => {
  beforeEach(() => {
    // Simula autenticación
    window.localStorage.setItem('user', JSON.stringify({
      arrendadorId: 1,
      cedula: '123456789',
      nombre: 'Test',
      apellido: 'User',
      correo: 'test@cypress.com',
      telefono: '3001234567',
      status: 'ACTIVE',
      cuenta: null
    }));

    // ✅ Intercept se debe hacer dentro de beforeEach o it
    cy.intercept('GET', 'http://localhost:8080/Propiedad/123', {
      statusCode: 200,
      body: {
        propiedadId: 123,
        nombre: 'Propiedad Cypress',
        departamento: 'Antioquia',
        municipio: 'Medellín',
        tipoIngreso: 'Principal',
        descripcion: 'Una propiedad de prueba cargada desde Cypress.',
        capacidad: 6,
        habitaciones: 3,
        banos: 2,
        permiteMascotas: true,
        tienePiscina: true,
        tieneAsador: true,
        valorNoche: 250000,
        status: 'ACTIVE',
        arrendador: {
          arrendadorId: 1,
          cedula: '123456789',
          nombre: 'Juan',
          apellido: 'Pérez',
          correo: 'juan@example.com',
          telefono: '3001234567',
          status: 'ACTIVE',
          cuenta: null
        },
        fotos: [
          { fotoId: 1, url: 'https://placehold.co/600x400?text=Foto+1' },
          { fotoId: 2, url: 'https://placehold.co/600x400?text=Foto+2' }
        ]
      }
    }).as('getDetalle');

    cy.visit('/propiedad/123');
  });

  it('debería mostrar los datos de la propiedad', () => {
    cy.wait('@getDetalle');
    cy.contains('Propiedad Cypress').should('be.visible');
    cy.contains('Medellín').should('exist');
    cy.get('.photo-carousel img').should('have.length', 2);
  });
});
