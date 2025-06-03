describe('Desactivar propiedad', () => {
  const propiedadId = 99;

  const arrendador = {
    arrendadorId: 1,
    nombre: 'Carlos',
    apellido: 'Ramírez',
    cedula: '123456789',
    correo: 'carlos@javeriana.edu.co',
    telefono: '3200000000',
    status: 'ACTIVE',
    cuenta: {
      cuentaId: 10,
      usuario: 'carlos@javeriana.edu.co',
      tipo: 'ARRENDADOR',
      status: 'ACTIVE'
    }
  };

  beforeEach(() => {
    localStorage.setItem('jwt', 'falso-token');
    localStorage.setItem('user', JSON.stringify(arrendador));

    cy.intercept('GET', '**/Propiedad/99', {
      propiedadId,
      nombre: 'Finca original',
      departamento: 'Cundinamarca',
      municipio: 'La Calera',
      tipoIngreso: 'Casa rural',
      descripcion: 'Hermosa finca para eventos',
      capacidad: 10,
      habitaciones: 5,
      banos: 3,
      permiteMascotas: true,
      tienePiscina: false,
      tieneAsador: true,
      valorNoche: 250000,
      status: 'ACTIVE',
      arrendador,
      fotos: []
    }).as('getPropiedad');

    cy.intercept('GET', '**/colombia.json', [
      { departamento: 'Cundinamarca', ciudades: ['La Calera', 'Chía'] }
    ]).as('getUbicaciones');

    cy.intercept('PUT', '**/Propiedad/99/desactivar', {
      propiedadId,
      status: 'DELETED'
    }).as('desactivarPropiedad');
  });

  it('Debería desactivar la propiedad correctamente', () => {
    cy.visit(`/propiedad/${propiedadId}/editar`);
    cy.wait('@getPropiedad');
    cy.wait('@getUbicaciones');

    // Click en el botón "Desactivar propiedad"
    cy.get('button.danger-btn').click();

    // Confirmar alerta nativa del navegador
    cy.on('window:confirm', () => true);

    // Esperar que se haga el PUT
    cy.wait('@desactivarPropiedad');

    // Confirmar mensaje
    cy.contains('Propiedad desactivada correctamente.').should('be.visible');
  });
});