import { NotificadorAcudientes } from '../src/notificador';

describe('Módulo Notificador (RN-10 a RN-13)', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mensajeria: any;
  let notificador: NotificadorAcudientes;

  beforeEach(() => {
    mensajeria = { enviarSMS: jest.fn().mockResolvedValue(true) };
    notificador = new NotificadorAcudientes(mensajeria);
  });

  // RN-10 y RN-12
  it('notificarProximidad_conTiempoValido_debeLlamarAlServicioConMensajeExacto', async () => {
    const acudientes = [{ nombre: 'Juan', telefono: '3001234567', notificacionesActivas: true }];
    const resultado = await notificador.notificarProximidad('ABC-123', 8, acudientes);
    
    expect(resultado).toBe(1);
    expect(mensajeria.enviarSMS).toHaveBeenCalledTimes(1);
    expect(mensajeria.enviarSMS).toHaveBeenCalledWith(
      '3001234567', 
      'RutaSegura: el bus ABC-123 llegará en aproximadamente 8 minutos.'
    );
  });

  it('notificarProximidad_conTiempoMayorADiez_noDebeEnviarNada', async () => {
    const acudientes = [{ nombre: 'Juan', telefono: '3001234567', notificacionesActivas: true }];
    const resultado = await notificador.notificarProximidad('ABC-123', 15, acudientes);
    
    expect(resultado).toBe(0);
    expect(mensajeria.enviarSMS).not.toHaveBeenCalled();
  });

  it('notificarProximidad_conTiempoNull_noDebeEnviarNada', async () => {
    const acudientes = [{ nombre: 'Juan', telefono: '3001234567', notificacionesActivas: true }];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const resultado = await notificador.notificarProximidad('ABC-123', null as any, acudientes);
    
    expect(resultado).toBe(0);
    expect(mensajeria.enviarSMS).not.toHaveBeenCalled();
  });

  // RN-11
  it('notificarProximidad_acudienteInactivo_noDebeEnviarSMS', async () => {
    const acudientes = [{ nombre: 'Juan', telefono: '3001234567', notificacionesActivas: false }];
    const resultado = await notificador.notificarProximidad('ABC-123', 5, acudientes);
    
    expect(resultado).toBe(0);
    expect(mensajeria.enviarSMS).not.toHaveBeenCalled();
  });

  // RN-13
  it('notificarProximidad_conFallosEnEnvio_debeContinuarYRetornarSoloLosExitosos', async () => {
    const acudientes = [
      { nombre: 'A', telefono: '1111111', notificacionesActivas: true },
      { nombre: 'B', telefono: '2222222', notificacionesActivas: true },
      { nombre: 'C', telefono: '3333333', notificacionesActivas: true }
    ];
    
    mensajeria.enviarSMS
      .mockRejectedValueOnce(new Error('Sin señal'))
      .mockResolvedValueOnce(false)
      .mockResolvedValueOnce(true);
    
    const resultado = await notificador.notificarProximidad('ABC-123', 5, acudientes);
    
    expect(resultado).toBe(1);
    expect(mensajeria.enviarSMS).toHaveBeenCalledTimes(3);
  });
});