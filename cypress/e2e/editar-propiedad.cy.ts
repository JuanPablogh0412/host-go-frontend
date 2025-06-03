describe('Editar propiedad', () => {
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
      { departamento: 'Cundinamarca', ciudades: ['La Calera', 'Chía'] },
      { departamento: 'Boyacá', ciudades: ['Tunja'] }
    ]).as('getUbicaciones');

    cy.intercept('PUT', '**/Propiedad', (req) => {
      req.reply({
        ...req.body,
        success: true
      });
    }).as('putPropiedad');
  });

  it('Debería editar y guardar los cambios de una propiedad', () => {
    cy.visit(`/propiedad/${propiedadId}/editar`);
    cy.wait('@getPropiedad');
    cy.wait('@getUbicaciones');

    // Cambiar algunos campos
    cy.get('input[formcontrolname="nombre"]').clear().type('Finca actualizada');
    cy.get('select[formcontrolname="departamento"]').select('Boyacá');
    cy.get('select[formcontrolname="municipio"]').select('Tunja');
    cy.get('input[formcontrolname="valorNoche"]').clear().type('300000');

    // Enviar formulario
    cy.get('button[type="submit"]').click();

    // Esperar la llamada PUT y confirmar mensaje
    cy.wait('@putPropiedad');
    cy.contains('Propiedad actualizada con éxito').should('be.visible');
  });
});
