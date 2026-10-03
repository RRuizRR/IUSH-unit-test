import { determinarNivelAlerta, calcularPorcentajeOcupacion } from '../src/alertas';

describe('Módulo Alertas (RN-08 y RN-09)', () => {
  // RN-08
  it('determinarNivelAlerta_conValoresLimites_debeRetornarNivelCorrecto', () => {
    expect(determinarNivelAlerta(0)).toBe('NINGUNA');
    expect(determinarNivelAlerta(5)).toBe('NINGUNA');
    expect(determinarNivelAlerta(6)).toBe('LEVE');
    expect(determinarNivelAlerta(15)).toBe('LEVE');
    expect(determinarNivelAlerta(16)).toBe('GRAVE');
  });

  it('determinarNivelAlerta_conRetrasoNegativo_debeLanzarError', () => {
    expect(() => determinarNivelAlerta(-1)).toThrow(RangeError);
  });

  // RN-09
  it('calcularPorcentajeOcupacion_conDecimalesYSobrecupo_debeRedondearAUnDecimal', () => {
    // 17 estudiantes en bus de 15 = 113.333... -> 113.3
    expect(calcularPorcentajeOcupacion(17, 15)).toBe(113.3);
  });

  it('calcularPorcentajeOcupacion_conValoresInvalidos_debeLanzarError', () => {
    expect(() => calcularPorcentajeOcupacion(-5, 20)).toThrow(RangeError);
    expect(() => calcularPorcentajeOcupacion(10, 0)).toThrow(RangeError);
  });
});