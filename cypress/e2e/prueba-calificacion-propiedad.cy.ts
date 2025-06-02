describe('Calificar usuario y propiedad sin enviar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('Debe mostrar el area para poner comentarios',()=>{
    cy.get('app-calificar-propiedad').should('exist');
  });
  it('Encuentra los botones para ver comentaios',()=>{
    cy.get('button.boton-comentario').last().click()

    cy.get('app-cali-propiedad').should('exist');
  });
  
  it('Hacer comentario de Propiedad',()=>{
    cy.get('app-calificar-propiedad', { timeout: 10000 }).should('exist');

    // Esperar explícitamente que el <select> esté visible y no deshabilitado
    cy.get('#propiedad-estrellas')
      .should('exist')
      .should('be.visible')
      .should('not.be.disabled');

    // Esperar un poco para evitar errores por renderizado async
    cy.wait(500);

    // Seleccionar una calificación
    cy.get('#propiedad-estrellas').select('5');

    // Escribir un comentario
    cy.get('#propiedad-comentario')
      .should('exist')
      .should('be.visible')
      .type('Hermosa vista al lago y propiedad');

    // Hacer clic en el botón para enviar
    cy.get('.propoCalificar').click();

    // Verificar si el envío muestra algo en consola o algún cambio
    cy.wait(500); // puedes agregar validaciones adicionales aquí si deseas
  });
  it('Si puede ver los comentarios hechos a la propiedad',()=>{
    cy.get('button.boton-comentario').last().click()

    cy.get('app-cali-propiedad').should('exist');
  });

});
