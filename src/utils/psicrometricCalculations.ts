/**
 * Utilidades para cálculos psicrométricos
 */

/**
 * Calcula la tensión de vapor usando la fórmula basada en Excel
 * @param Ts - Temperatura del termómetro seco (°C)
 * @param Th - Temperatura del termómetro húmedo (°C)
 * @param P - Presión atmosférica (hPa), por defecto 1000
 * @returns Tensión de vapor en hPa
 */
export const calcularTensionVapor = (Ts: number, Th: number, P: number = 1000): number => {
  const T_kelvin = Th + 273.16;

  const term1 = -7.90298 * (373.16 / T_kelvin - 1);
  const term2 = 5.02808 * Math.log10(373.16 / T_kelvin);
  const term3 = -1.3816e-7 * (Math.pow(10, 11.344 * (1 - T_kelvin / 373.16)) - 1);
  const term4 = 8.1328e-3 * (Math.pow(10, -3.49149 * (373.16 / T_kelvin - 1)) - 1);
  const term5 = 3.0057498;

  const log10_e = term1 + term2 + term3 + term4 + term5;
  const e = Math.pow(10, log10_e);

  const psicrometrico = (0.00066 * (1 + 0.00115 * Th)) * P * (Ts - Th);

  return e - psicrometrico;
};

/**
 * Calcula la humedad relativa basada en la temperatura seca y la tensión de vapor
 * @param Ts - Temperatura del termómetro seco (°C)
 * @param TV - Tensión de vapor (hPa)
 * @returns Humedad relativa en porcentaje
 */
export const calcularHumedadRelativa = (Ts: number, TV: number): number => {
  const T_kelvin = Ts + 273.16;

  const term1 = -7.90298 * (373.16 / T_kelvin - 1);
  const term2 = 5.02808 * Math.log10(373.16 / T_kelvin);
  const term3 = -1.3816e-7 * (Math.pow(10, 11.344 * (1 - T_kelvin / 373.16)) - 1);
  const term4 = 8.1328e-3 * (Math.pow(10, -3.49149 * (373.16 / T_kelvin - 1)) - 1);
  const term5 = 3.0057498;

  const log10_e_saturacion = term1 + term2 + term3 + term4 + term5;
  const e_saturacion = Math.pow(10, log10_e_saturacion);

  return (TV / e_saturacion) * 100;
};

/**
 * Calcula el punto de rocío basado en la tensión de vapor
 * @param TV - Tensión de vapor (hPa)
 * @returns Punto de rocío en °C
 */
export const calcularPuntoRocio = (TV: number): number => {
  return 237.3 / ((7.5 / (Math.log10(TV) - Math.log10(6.11))) - 1);
};

/**
 * Calcula todos los parámetros psicrométricos
 * @param Ts - Temperatura del termómetro seco (°C)
 * @param Th - Temperatura del termómetro húmedo (°C)
 * @returns Objeto con todos los parámetros calculados
 */
export const calcularTodosParametros = (Ts: number, Th: number) => {
  const eActual = calcularTensionVapor(Ts, Th, 1000);
  const humedadRelativa = calcularHumedadRelativa(Ts, eActual);
  const puntoRocio = calcularPuntoRocio(eActual);

  return {
    tensionVapor: eActual,
    humedadRelativa,
    puntoRocio,
  };
};

