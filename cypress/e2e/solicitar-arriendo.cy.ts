describe('Solicitar Arriendo', () => {
  const mockPropiedadId = 555;

  const mockPropiedad = {
    propiedadId: mockPropiedadId,
    nombre: 'Cabaña Los Álamos',
    descripcion: 'Hermosa cabaña rodeada de naturaleza',
    departamento: 'Antioquia',
    municipio: 'Guatapé',
    capacidad: 6,
    habitaciones: 3,
    banos: 2,
    permiteMascotas: true,
    tienePiscina: true,
    tieneAsador: true,
    valorNoche: 250000,
    fotos: ['https://via.placeholder.com/400x300']
  };

  const mockSolicitudResponse = {
    solicitudId: 999,
    fechaInicio: '2025-06-20',
    fechaFin: '2025-06-23',
    cantidadPer: 4,
    costoTotal: 750000,
    status: 'INACTIVE',
    propiedad: { propiedadId: mockPropiedadId },
    arrendatario: { arrendatarioId: 123 }
  };

  beforeEach(() => {
    localStorage.setItem('jwt', 'fake-token');
    localStorage.setItem('user', JSON.stringify({
      arrendatarioId: 123,
      nombre: 'Maria',
      apellido: 'López',
      correo: 'maria@javeriana.edu.co',
      cuenta: {
        cuentaId: 20,
        tipo: 'ARRENDATARIO'
      }
    }));

    cy.intercept('GET', `**/Propiedad/${mockPropiedadId}`, mockPropiedad).as('getPropiedad');
    cy.intercept('POST', '**/Solicitud', req => {
      expect(req.body.propiedad.propiedadId).to.eq(mockPropiedadId);
      expect(req.body.arrendatario.arrendatarioId).to.eq(123);
      req.reply(mockSolicitudResponse);
    }).as('postSolicitud');
  });

  it('Debe permitir al arrendatario solicitar arriendo exitosamente', () => {
    cy.visit(`/propiedad/${mockPropiedadId}`);
    cy.wait('@getPropiedad');

    // Llenar formulario de reserva
    cy.get('input[formControlName="fechaInicio"]').type('2025-06-20');
    cy.get('input[formControlName="fechaFin"]').type('2025-06-23');
    cy.get('input[formControlName="cantidadPer"]').clear().type('4');

    cy.get('button[type="submit"]').click();
    cy.wait('@postSolicitud');

    // Verificamos que aparezca mensaje de éxito
    cy.contains('Solicitud enviada! Costo: $750000').should('be.visible');
  });
});
