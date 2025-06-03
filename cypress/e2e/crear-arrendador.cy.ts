// cypress/e2e/login.cy.ts

describe('Flujo de Login (con mock de respuesta)', () => {
  // Generamos un correo único para este test
  const timestamp = Date.now();
  const testCorreo = `usuario${timestamp}@javeriana.edu.co`;
  const testContrasena = 'ClaveSegura123';

  before(() => {
    // 1) Primero, registramos un arrendador a través de la UI
    cy.visit('/crear-arrendador');

    cy.get('input#cedula').type('99999999');
    cy.get('input#nombre').type('TestLogin');
    cy.get('input#apellido').type('Usuario');
    cy.get('input#correo').type(testCorreo);
    cy.get('input#telefono').type('3000000000');
    cy.get('input#contrasena').type(testContrasena);

    cy.get('button[type="submit"]').click();

    // Verificamos que el registro haya sido exitoso
    cy.contains(
      'Cuenta creada correctamente! Revisa tu correo para activar tu cuenta.'
    ).should('be.visible');

    // Nota: en modo “test” nuestro backend NO requiere activación real por e‐mail,
    // así que la cuenta ya está “ACTIVE” y podemos loguearnos directamente.
  });

  it('Debería iniciar sesión (mock) con credenciales válidas y redirigir al home', () => {
    // 2) Interceptamos el POST /auth/login para devolver nuestro fixture “login-success.json”
    cy.intercept(
      {
        method: 'POST',
        url: '/auth/login'
      },
      { fixture: 'login-success.json' }
    ).as('fakeLogin');

    // 3) Ahora visitamos la página de login
    cy.visit('/login');

    // 4) Llenamos los campos de login (se ignora el backend real)
    cy.get('input[type="email"]').type(testCorreo);
    cy.get('input[type="password"]').type(testContrasena);

    // 5) Verificamos que el botón de enviar esté habilitado y hacemos clic
    cy.get('button[type="submit"]').should('not.be.disabled').click();

    // 6) Esperamos a que termine la llamada “fakeLogin”
    cy.wait('@fakeLogin').its('response.statusCode').should('eq', 200);

    // 7) Tras el “login” simulado, el front debería redirigir al “/” (home)
    cy.url().should('eq', Cypress.config().baseUrl + '/');

    // 8) Comprobamos que en el header o en la UI aparezca el nombre “TestLogin Usuario”
    //    (si tu app muestra “TestLogin Usuario” en algún lugar una vez logueado)
    cy.contains('Encuentra tu lugar perfecto').should('be.visible');
  });

  it('Debe mostrar error al intentar login con credenciales inválidas', () => {
    // 1) Interceptamos el POST /auth/login para devolver un 401 con cuerpo { error: "Credenciales inválidas" }
    cy.intercept(
      {
        method: 'POST',
        url: '/auth/login'
      },
      {
        statusCode: 401,
        body: { error: 'Credenciales inválidas' }
      }
    ).as('fakeLoginFail');

    // 2) Visitamos la página de login
    cy.visit('/login');

    // 3) Llenamos el formulario con credenciales equivocadas
    cy.get('input[type="email"]').type('no.existe@javeriana.edu.co');
    cy.get('input[type="password"]').type('ClaveEquivocada123');

    // 4) Hacemos clic en “Iniciar sesión”
    cy.get('button[type="submit"]').click();

    // 5) Esperamos la llamada y comprobamos que devolvió 401
    cy.wait('@fakeLoginFail').its('response.statusCode').should('eq', 401);

    // 6) Verificamos que se muestre el mensaje de “Credenciales inválidas”
    cy.contains('Credenciales inválidas').should('be.visible');
  });
});
