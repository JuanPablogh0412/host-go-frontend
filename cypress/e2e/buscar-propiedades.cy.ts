describe('Buscar propiedades', () => {
  const propiedadesMock = [
    {
      propiedadId: 201,
      nombre: 'Finca El Edén',
      departamento: 'Antioquia',
      municipio: 'Rionegro',
      valorNoche: 250000,
      fotos: [{ url: 'https://www.fincasquindio.com.co/wp-content/uploads/2022/02/finca_tipica_quindio.jpg' }]
    },
    {
      propiedadId: 202,
      nombre: 'Finca La Esperanza',
      departamento: 'Antioquia',
      municipio: 'Guarne',
      valorNoche: 180000,
      fotos: []
    }
  ];

  beforeEach(() => {
    // Intercepta la búsqueda de propiedades con los parámetros de la URL
    cy.intercept(
      'GET',
      '**/Propiedad/buscar*',
      req => {
        // Puedes agregar validaciones sobre los params si lo deseas
        req.reply(propiedadesMock);
      }
    ).as('buscarPropiedades');
  });

  it('Debería mostrar los resultados de búsqueda correctamente', () => {
    cy.visit('/buscar?nombre=Finca&ubicacion=Antioquia&capacidad=2');
    cy.wait('@buscarPropiedades');

    // Verifica que se muestran los nombres de las propiedades mockeadas
    cy.contains('Finca El Edén').should('exist');
    cy.contains('Finca La Esperanza').should('exist');

    // Verifica ubicaciones
    cy.contains('Antioquia, Rionegro').should('exist');
    cy.contains('Antioquia, Guarne').should('exist');

    // Verifica precios
    cy.contains('250000').should('exist');
    cy.contains('180000').should('exist');
  });
});