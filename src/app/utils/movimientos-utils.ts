import { IMovimiento } from "../models/movimiento";

export function calcularFaltante(movimientos: any | any[]){
        
  return calcularTotalRecibido(movimientos)-calcularTotalEntregado(movimientos);

};

export function calcularTotalRecibido(movimientos: any | any[]): number {
  const denominaciones = [
    { campo: 'recibe1d', factor: 1 },
    { campo: 'recibe5d', factor: 5 },
    { campo: 'recibe10d', factor: 10 },
    { campo: 'recibe20d', factor: 20 },
    { campo: 'recibe1c', factor: 0.01 },
    { campo: 'recibe5c', factor: 0.05 },
    { campo: 'recibe10c', factor: 0.10 },
    { campo: 'recibe25c', factor: 0.25 },
    { campo: 'recibe50c', factor: 0.50 }
  ];

  // Convertir a array si es solo un objeto
  const items = Array.isArray(movimientos) ? movimientos : [movimientos];

  return items.reduce((totalMov, mov) => {
    const subtotal = denominaciones.reduce((subtotal, d) => {
      const valor = Number(mov?.[d.campo] ?? 0);
      return subtotal + valor * d.factor;
    }, 0);
    return totalMov + subtotal;
  }, 0);
}

export function calcularTotalEntregado(movimientos: any | any[]): number {
  const denominaciones = [
    { campo: 'entrega1d', factor: 1 },
    { campo: 'entrega5d', factor: 5 },
    { campo: 'entrega10d', factor: 10 },
    { campo: 'entrega20d', factor: 20 },
    { campo: 'entrega1c', factor: 0.01 },
    { campo: 'entrega5c', factor: 0.05 },
    { campo: 'entrega10c', factor: 0.10 },
    { campo: 'entrega25c', factor: 0.25 },
    { campo: 'entrega50c', factor: 0.50 }
  ];

  // Convertir a array si es solo un objeto
  const items = Array.isArray(movimientos) ? movimientos : [movimientos];

  return items.reduce((totalMov, mov) => {
    const subtotal = denominaciones.reduce((subtotal, d) => {
      const valor = Number(mov?.[d.campo] ?? 0);
      return subtotal + valor * d.factor;
    }, 0);
    return totalMov + subtotal;
  }, 0);
}

export function onlyHourFormated( fecha: string ): string{
  
    const d = new Date(fecha ?? '');
    const h = d.getHours().toString().padStart(2, '0');
    const m = d.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
    
  }

  export function onlyDateFormated( fecha: string ): string{
  
    const d = new Date(fecha ?? '');
    const day = d.getDate().toString().padStart(2, '0'); // día del mes
    const m = (d.getMonth() + 1).toString().padStart(2, '0'); // mes
    const y = d.getFullYear().toString();
    return `${day}/${m}/${y}`;
    
  }

export function formatCurrency(amount: number) {
    return  `$ ${amount?.toFixed(2) ?? '0.00'}`
};

export function detalleRetiroParcial(retiro: IMovimiento):string{
    let denominaciones:string='';
    if(retiro.recibe20d!='0')denominaciones += `\$20x${retiro.recibe20d} `;
    if(retiro.recibe10d!='0')denominaciones += `\$10x${retiro.recibe10d} `;
    if(retiro.recibe5d!='0')denominaciones += `\$5x${retiro.recibe5d} `;
    if(retiro.recibe1d!='0')denominaciones += `\$1x${retiro.recibe1d} `;

    return denominaciones;
}

export function numberToWords(numero: number) {
  if (numero === 0) return "CERO";

  const unidades = [
    "",
    "uno",
    "dos",
    "tres",
    "cuatro",
    "cinco",
    "seis",
    "siete",
    "ocho",
    "nueve"
  ];

  const decenas = [
    "",
    "diez",
    "veinte",
    "treinta",
    "cuarenta",
    "cincuenta",
    "sesenta",
    "setenta",
    "ochenta",
    "noventa"
  ];

  const especiales = [
    "once",
    "doce",
    "trece",
    "catorce",
    "quince",
    "dieciséis",
    "diecisiete",
    "dieciocho",
    "diecinueve"
  ];

  const centenas = [
    "",
    "cien",
    "doscientos",
    "trescientos",
    "cuatrocientos",
    "quinientos",
    "seiscientos",
    "setecientos",
    "ochocientos",
    "novecientos"
  ];

  function convertir(n: number): string {
    let u: number;
    if (n < 10) return unidades[n];
    if (n >= 11 && n < 20) return especiales[n - 11];
    if (n < 100) {
      u = n % 10;
      return decenas[Math.floor(n / 10)] + (u > 0 ? ` y ${unidades[u]}` : "");
    }
    if (n < 1000) {
      const resto = n % 100;
      return centenas[Math.floor(n / 100)] + (resto > 0 ? ` ${convertir(resto)}` : "");
    }
    if (n < 1000000) {
      const miles = Math.floor(n / 1000);
      const resto = n % 1000;
      return (miles === 1 ? "mil" : `${convertir(miles)} mil`) +
        (resto > 0 ? ` ${convertir(resto)}` : "");
    }
    throw new Error("Número fuera de rango");
  }

  // Separar parte entera y centavos
  const parteEntera = Math.floor(numero);
  const centavos = Math.round((numero - parteEntera) * 100);

  let resultado = convertir(parteEntera);

  if (centavos > 0) {
    resultado += ` con ${convertir(centavos)} centavos`;
  }

  return resultado.toUpperCase();
}


export function getBase64FromUrl(url: string): Promise<string> {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

  return fetch(proxyUrl +url)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
        })
    );
}