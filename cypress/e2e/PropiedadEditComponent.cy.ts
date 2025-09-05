describe('Editar Propiedad - simulación completa', () => {
  beforeEach(() => {
    // Interceptamos ubicaciones
    cy.intercept('GET', '**/resource/xdk5-pm3f.json', {
      statusCode: 200,
      body: [
        { departamento: 'Antioquia', municipio: 'Medellín' },
        { departamento: 'Cundinamarca', municipio: 'Bogotá' }
      ]
    }).as('getUbicaciones');

    // Interceptamos propiedad
    cy.intercept('GET', '**/propiedad/123', {
      statusCode: 200,
      body: {
        propiedadId: 123,
        nombre: 'Propiedad Cypress',
        departamento: 'Antioquia',
        municipio: 'Medellín',
        tipoIngreso: 'Principal',
        descripcion: 'Una propiedad de prueba',
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
          nombre: 'Juan',
          apellido: 'Pérez',
          correo: 'juan@example.com',
          telefono: '3001234567',
          status: 'ACTIVE',
          cuenta: null
        },
        fotos: []
      }
    }).as('getPropiedad');

    // visit con localStorage antes de cargar
    cy.visit('/propiedad/editar/123', {
      onBeforeLoad(win) {
        win.localStorage.setItem('user', JSON.stringify({
          arrendadorId: 1,
          nombre: 'Test',
          apellido: 'User',
          correo: 'test@cypress.com',
          telefono: '3001234567',
          status: 'ACTIVE',
          cuenta: null
        }));
      }
    });
  });

  it('debería mostrar los datos de la propiedad en el formulario', () => {
    cy.wait('@getUbicaciones');
    cy.wait('@getPropiedad');

    cy.get('input[formControlName="nombre"]', { timeout: 10000 })
      .should('have.value', 'Propiedad Cypress');
  });
});
