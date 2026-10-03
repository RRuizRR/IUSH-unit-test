import { calcularMinutosEstimados, calcularHoraEstimadaLlegada } from '../src/eta';

describe('Módulo ETA (RN-01 a RN-05)', () => {
  // RN-01
  it('calcularMinutosEstimados_conDatosValidos_debeRetornarMinutosRedondeadosArriba', () => {
    // 10km / 40km/h * 60 * 1.5 = 22.5 -> redondeado arriba es 23
    expect(calcularMinutosEstimados(40, 10, 1.5)).toBe(23);
  });

  // RN-02
  it('calcularMinutosEstimados_conDistanciaCero_debeRetornarCero', () => {
    expect(calcularMinutosEstimados(0, 0, 1.0)).toBe(0);
  });

  it('calcularMinutosEstimados_conVelocidadCero_debeRetornarNull', () => {
    expect(calcularMinutosEstimados(0, 10, 1.0)).toBeNull();
  });

  // RN-03
  it('calcularMinutosEstimados_conValoresNegativos_debeLanzarError', () => {
    expect(() => calcularMinutosEstimados(-10, 10, 1.0)).toThrow(RangeError);
    expect(() => calcularMinutosEstimados(40, -10, 1.0)).toThrow(RangeError);
  });

  // RN-04
  it('calcularMinutosEstimados_conFactorFueraDeRango_debeLanzarError', () => {
    expect(() => calcularMinutosEstimados(40, 10, 0.9)).toThrow(RangeError);
    expect(() => calcularMinutosEstimados(40, 10, 3.1)).toThrow(RangeError);
  });

  // RN-05
  it('calcularHoraEstimadaLlegada_conDatosValidos_debeRetornarFechaNueva', () => {
    const horaActual = new Date(2026, 8, 22, 6, 30);
    const resultado = calcularHoraEstimadaLlegada(40, 10, 1.5, horaActual);
    
    // Debería sumar 23 minutos (6:30 + 23 = 6:53)
    expect(resultado).toEqual(new Date(2026, 8, 22, 6, 53));
  });

  it('calcularHoraEstimadaLlegada_inmutabilidad_noDebeModificarFechaOriginal', () => {
    const horaActual = new Date(2026, 8, 22, 6, 30);
    const clonHora = new Date(horaActual.getTime());
    
    calcularHoraEstimadaLlegada(40, 10, 1.5, horaActual);
    
    // Verificamos que la variable original no cambió
    expect(horaActual).toEqual(clonHora);
  });
});