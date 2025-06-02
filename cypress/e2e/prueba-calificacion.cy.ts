describe('Calificar usuario y propiedad sin enviar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });
  //Este spec es principalmente para probar la calificacion de un usuario independientemente de que sea arrendatario o arrendador

  it('Debe mostrar el header del usuario', () => {
    cy.get('.usuario-header')
      .should('exist')
      .and('contain', 'Juan')
      .and('contain', '4.5');
  });

  it('Debe mostrar el area para poner comentarios',()=>{
    cy.get('app-calificar-usuario').should('exist');
  });
  it('Encuentra los botones para ver comentaios',()=>{
    cy.get('button.boton-comentario').first().click()

    cy.get('app-calificacion').should('exist');
  });
  it('Hacer comentario para usuario',()=>{
    cy.get('app-calificar-usuario', { timeout: 10000 }).should('exist');

    // Esperar explícitamente que el <select> esté visible y no deshabilitado
    cy.get('#usuario-estrellas')
      .should('exist')
      .should('be.visible')
      .should('not.be.disabled');

    // Esperar un poco para evitar errores por renderizado async
    cy.wait(500);

    // Seleccionar una calificación
    cy.get('#usuario-estrellas').select('4');

    // Escribir un comentario
    cy.get('#usuario-comentario')
      .should('exist')
      .should('be.visible')
      .type('Buen Host buena atencion al cliente');

    // Hacer clic en el botón para enviar
    cy.get('.boton-enviar-usuario').click();

    // Verificar si el envío muestra algo en consola o algún cambio
    cy.wait(500); // puedes agregar validaciones adicionales aquí si deseas
  });
  
  it('Si puede ver los comentarios hechos a el usuario',()=>{
    cy.get('button.boton-comentario').first().click()

    cy.get('app-calificacion').should('exist');
  });

});
