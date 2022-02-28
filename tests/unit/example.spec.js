describe('Example component', () => {
  test('Debe ser mayor a 10', () => {
    //Arreglar
    let value = 10;

    //Estimulo
    value = value + 2;

    //Observar resultado
    expect( value ).toBeGreaterThan( 10 );
  })
})