describe('Ver Mis Propiedades', () => {
  const usuario = {
    arrendadorId: 1,
    nombre: 'Juan',
    apellido: 'Pérez',
    correo: 'juan@javeriana.edu.co',
    cuenta: {
      cuentaId: 10,
      usuario: 'juan@javeriana.edu.co',
      tipo: 'ARRENDADOR'
    }
  };

  const propiedadesMock = [
    {
      propiedadId: 101,
      nombre: 'Finca El Paraíso',
      departamento: 'Cundinamarca',
      municipio: 'La Vega',
      valorNoche: 150000,
      fotos: [{ url: 'https://phantom-expansion.unidadeditorial.es/06db7935174641483416a9fd12a6e9b8/resize/640/assets/multimedia/imagenes/2021/03/16/16158875407535.jpg' }]
    },
    {
      propiedadId: 102,
      nombre: 'Casa Campestre Sol',
      departamento: 'Boyacá',
      municipio: 'Villa de Leyva',
      valorNoche: 200000,
      fotos: [{url: 'https://pics.nuroa.com/venta_casa_cedritos_bogota_2380000747399574876.jpg'}]
    }
  ];

  beforeEach(() => {
    // Simulamos que el usuario ya está logueado
    localStorage.setItem('user', JSON.stringify(usuario));
    localStorage.setItem('jwt', 'fake-jwt-token');

    // Interceptamos el llamado al backend y devolvemos propiedades simuladas
    cy.intercept('GET', '**/Propiedad/misPropiedades', propiedadesMock).as('getMisPropiedades');
  });

  it('Debería mostrar el listado de mis propiedades correctamente', () => {
    cy.visit('/mis-propiedades');

    // Esperar a que se cargue el mock
    cy.wait('@getMisPropiedades');

    // Verificamos que se muestren ambas propiedades
    cy.contains('Finca El Paraíso').should('exist');
    cy.contains('Casa Campestre Sol').should('exist');

    // Verificar la ubicación de una propiedad
    cy.contains('Cundinamarca, La Vega').should('exist');
    cy.contains('Boyacá, Villa de Leyva').should('exist');

    // Verificamos los precios
    cy.contains('$150,000').should('exist');
    cy.contains('$200,000').should('exist');

    // Verificamos que existan los botones de acción (editar y ver detalles)
    cy.get('.action-btn').should('have.length.greaterThan', 1);
  });
});
