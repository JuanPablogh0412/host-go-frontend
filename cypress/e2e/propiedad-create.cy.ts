// cypress/e2e/propiedad-create.cy.ts

describe('Flujo de Crear Propiedad', () => {
  // 1) Datos de arrendador simulados (coinciden con tu fixture de login)
  const fakeToken = 'eyJhbGciOiJmYWtlLmp...'; // JWT “falso”
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
    // 2) Podemos copiar aquí tu fixture “login-success.json” en localStorage:
    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('jwt', fakeToken);
        win.localStorage.setItem('user', JSON.stringify(fakeArrendador));
      }
    });

    // 3) Interceptamos la llamada que hace fetch('/colombia.json') en tu servicio
    cy.intercept('GET', '/colombia.json', (req) => {
      // Devolvemos exactamente el array completo que espera el servicio:
      req.reply({
        statusCode: 200,
        body: [
          {
            "id": 1,
            "departamento": "Antioquia",
            "ciudades": ["Abejorral", "Abriaquí", "Alejandría", "Amagá"]
          },
          {
            "id": 2,
            "departamento": "Amazonas",
            "ciudades": ["Leticia", "Puerto Nariño"]
          }
          // ... puedes agregar más departamentos/ciudades si gustas
        ]
      });
    }).as('getUbicaciones');

    // 4) Interceptamos la llamada POST a /Propiedad para retornar un objeto con propiedadId = 999
    cy.intercept('POST', '/Propiedad', (req) => {
      expect(req.body).to.have.property('nombre');
      // Respondemos con todos los datos del body + propiedadId: 999
      req.reply({
        statusCode: 200,
        body: {
          ...req.body,
          propiedadId: 999
        }
      });
    }).as('postPropiedad');
  });

  it('Debería crear una nueva propiedad y redirigir a subir fotos', () => {
    // 5) Visitamos la ruta de crear propiedad; esto dispara obtenerUbicaciones()
    cy.visit('/crear-propiedad');
    cy.wait('@getUbicaciones');

    // 6) Llenamos el formulario paso a paso

    cy.get('input[formControlName="nombre"]').type('Casa de Prueba');

    // Seleccionamos “Antioquia” en el select de departamentos
    cy.get('select[formControlName="departamento"]').should('be.visible').select('Antioquia');
    cy.get('select[formControlName="departamento"]').should('have.value', 'Antioquia');

    // Al cambiar departamento, el componente rellena el arreglo municipios = ["Abejorral","Abriaquí",...]
    // Ahora seleccionamos “Abejorral”
    cy.get('select[formControlName="municipio"]')
      .should('not.be.disabled')
      .select('Abejorral')
      .should('have.value', 'Abejorral');

    cy.get('input[formControlName="tipoIngreso"]').type('Secundaria');
    cy.get('textarea[formControlName="descripcion"]').type('Una casa cómoda para pruebas.');

    cy.get('input[formControlName="capacidad"]').clear().type('4');
    cy.get('input[formControlName="habitaciones"]').clear().type('2');
    cy.get('input[formControlName="banos"]').clear().type('1');

    // Marcamos algunas casillas
    cy.get('input[formControlName="permiteMascotas"]').check();
    cy.get('input[formControlName="tienePiscina"]').check();
    // Dejamos “tieneAsador” sin marcar

    cy.get('input[formControlName="valorNoche"]').clear().type('150000');

    // 7) El submit “Subir fotos” debe estar habilitado y hacemos click
    cy.get('button[type="submit"]').should('not.be.disabled').click();

    // 8) Verificamos que el backend “respondió” con status 200 y propiedadId = 999
    cy.wait('@postPropiedad').its('response.statusCode').should('eq', 200);

    // 9) Finalmente la URL debe incluir “/propiedad/999/fotos”
    cy.url().should('include', '/propiedad/999/fotos');
  });
});
