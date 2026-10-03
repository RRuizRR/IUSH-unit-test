import { validarCoordenadas, esPlacaValida } from '../src/validaciones';

describe('Módulo Validaciones (RN-06 y RN-07)', () => {
  // RN-06
  it('validarCoordenadas_conLimitesExactos_debeRetornarTrue', () => {
    expect(validarCoordenadas(90, 180)).toBe(true);
    expect(validarCoordenadas(-90, -180)).toBe(true);
  });

  it('validarCoordenadas_conValoresFueraDeRango_debeRetornarFalse', () => {
    expect(validarCoordenadas(91, 0)).toBe(false);
    expect(validarCoordenadas(0, -181)).toBe(false);
  });

  it('validarCoordenadas_conNaN_debeRetornarFalse', () => {
    expect(validarCoordenadas(NaN, 100)).toBe(false);
  });

  // RN-07
  it('esPlacaValida_conFormatosCorrectos_debeRetornarTrue', () => {
    expect(esPlacaValida('ABC123')).toBe(true);
    expect(esPlacaValida('ABC-123')).toBe(true);
    expect(esPlacaValida('abc123')).toBe(true);
    expect(esPlacaValida('  XYZ987  ')).toBe(true); // Espacios al inicio/final
  });

  it('esPlacaValida_conFormatosIncorrectos_debeRetornarFalse', () => {
    expect(esPlacaValida('123ABC')).toBe(false); // Números primero
    expect(esPlacaValida('AB-C123')).toBe(false); // Guion mal puesto
    expect(esPlacaValida('ABCD12')).toBe(false); // 4 letras
    expect(esPlacaValida('AB1234')).toBe(false); // 4 números
  });
});