import { useState, useEffect, useRef } from 'react';
import './TemperatureInput.css';

interface TemperatureInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  icon?: string;
}

// Convertir número a string con formato X.X (1 decimal)
const formatToDisplay = (num: number): string => {
  // Manejar casos especiales
  if (!isFinite(num) || isNaN(num)) {
    return '0.0';
  }
  // Formatear siempre con 1 decimal
  const formatted = Math.abs(num).toFixed(1);
  // Si es negativo, agregar el signo
  return num < 0 ? `-${formatted}` : formatted;
};

// Convertir string ingresado a número decimal
const parseInputToNumber = (input: string): number => {
  if (input === '' || input === '.') return 0;
  
  // Permitir números y un punto decimal
  const cleanInput = input.replace(/[^\d.]/g, '');
  
  // Si hay un punto, verificar que solo haya uno
  const parts = cleanInput.split('.');
  if (parts.length > 2) {
    // Si hay más de un punto, tomar solo el primero
    return parseFloat(parts[0] + '.' + parts[1]);
  }
  
  // Si no hay punto y es solo números
  if (parts.length === 1) {
    const numbersOnly = cleanInput.replace(/[^\d]/g, '');
    if (numbersOnly === '') return 0;
    
    // Si tiene más de 1 dígito sin punto, el último es decimal
    if (numbersOnly.length > 1) {
      const integerPart = numbersOnly.slice(0, -1);
      const decimalPart = numbersOnly.slice(-1);
      return parseFloat(`${integerPart}.${decimalPart}`);
    }
    return parseFloat(numbersOnly);
  }
  
  // Si hay un punto (partes[0] y partes[1])
  const integerPart = parts[0] || '0';
  const decimalPart = parts[1] || '0';
  
  // Limitar decimales a 2 dígitos máximo
  const limitedDecimal = decimalPart.length > 2 ? decimalPart.substring(0, 2) : decimalPart;
  
  return parseFloat(`${integerPart}.${limitedDecimal}`);
};

const TemperatureInput = ({ label, value, onChange, icon = '🌡️' }: TemperatureInputProps) => {
  // Si el valor inicial es 0, usar cadena vacía para mostrar el placeholder
  const [displayValue, setDisplayValue] = useState(value === 0 ? '' : formatToDisplay(value));
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sincronizar cuando el valor externo cambia
  useEffect(() => {
    if (!isFocused) {
      const formatted = value === 0 ? '' : formatToDisplay(value);
      setDisplayValue(formatted);
    }
  }, [value, isFocused]);

  const handleFocus = () => {
    setIsFocused(true);
    // Limpiar el input al hacer focus
    setDisplayValue('');
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Formatear al formato correcto cuando pierde el focus
    // Si el valor es 0, mostrar cadena vacía para el placeholder
    const formatted = value === 0 ? '' : formatToDisplay(value);
    setDisplayValue(formatted);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    
    // Permitir números y un punto decimal
    const validInput = input.replace(/[^\d.]/g, '');
    
    // Limitar longitud total (por ejemplo, máximo 6 caracteres como "123.45")
    if (validInput.length > 6) {
      return;
    }
    
    setDisplayValue(validInput);
    
    // Convertir a número
    const parsedValue = parseInputToNumber(validInput);
    onChange(parsedValue);
  };

  return (
    <div className="temperature-input-container">
      <div className="input-header">
        <span className="input-icon">{icon}</span>
        <h3 className="input-label">{label}</h3>
      </div>
      <div className="input-wrapper">
        <input
          ref={inputRef}
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="temperature-input"
          placeholder="00.0"
        />
        <span className="input-unit">°C</span>
      </div>
    </div>
  );
};

export default TemperatureInput;

