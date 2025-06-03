describe('Flujo de Subir Fotos a Propiedad (Mock)', () => {
  const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.jwt.token';
  const fakeArrendador = {
    arrendadorId: 123,
    cedula: '99999999',
    nombre: 'Juan',
    apellido: 'Propietario',
    correo: 'juan.prop@javeriana.edu.co',
    telefono: '3000000000',
    cuenta: {
      cuentaId: 456,
      usuario: 'juan.prop@javeriana.edu.co',
      tipo: 'ARRENDADOR',
      status: 'ACTIVE'
    }
  };

  beforeEach(() => {
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('jwt', fakeToken);
        win.localStorage.setItem('user', JSON.stringify(fakeArrendador));
      }
    });

    // Mock de subida de foto (NO llega al backend real)
    cy.intercept('POST', '/Foto/propiedad/999', (req) => {
      // Simula validación de JWT en el header
      expect(req.headers['authorization']).to.eq(`Bearer ${fakeToken}`);
      req.reply({
        statusCode: 200,
        body: {
          fotoId: 1,
          url: 'https://fakeurl.com/foto1.jpg',
          propiedadId: 999
        }
      });
    }).as('subirFoto');
  });

  it('Debe subir una foto y mostrar mensaje de éxito (mock)', () => {
    cy.visit('/propiedad/999/fotos');

    cy.get('input[type="file"]').selectFile('cypress/fixtures/foto-ejemplo.jpg', { force: true });

    // Verifica que el archivo aparece en la previsualización (si tu UI lo muestra)
    cy.contains('foto-ejemplo.jpg').should('exist');

    cy.get('button.primary-btn').click();

    cy.wait('@subirFoto');

    // Verifica mensaje de éxito simulado
    cy.contains('subido correctamente').should('be.visible');

    // Botón finalizar habilitado
    cy.get('button.finish-btn').should('not.be.disabled');

    // Redirección simulada
    cy.get('button.finish-btn').click();
    cy.url().should('include', '/mis-propiedades');
  });
});