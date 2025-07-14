import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { IMovimiento } from "src/app/models/movimiento";
import {logoBase64} from "src/assets/images/base64/images-base64"
import { calcularTotalEntregado, calcularTotalRecibido, detalleRetiroParcial, formatCurrency, getBase64FromUrl, numberToWords, onlyDateFormated, onlyHourFormated } from "src/app/utils/movimientos-utils";
// import { variable64 } from "../../assets/img";

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


const generatePDF = async (movimientos: IMovimiento[],): Promise <any> => {

  const styles = {
    title: { fontSize: 10, bold: true,alignment: 'center' },
    header: { fontSize: 16, bold: true,alignment: 'center' },
    subheader: { fontSize: 12, margin: [0, 5, 0, 5],alignment: 'center'},
    tableHeader: { fontSize: 8,bold: true, fillColor: '#bbdefb',alignment: 'center' },
    tableSubHeader: { fontSize: 8,fillColor: '#e3f2fd',alignment: 'center' },
    tableContent: {fontSize: 8,alignment: 'center'},
    total: { bold: true, fontSize: 8, alignment: 'center' }, 
    branchName: {fontSize: 10,italics: true},
    valorEscrito: {fontSize: 10, alignment: 'left'},
  };

  const apertura = movimientos.find((m)=> m.idTipoMovimiento =='1'); // Solo 1 movimiento ejemplo
  const retirosParciales = movimientos
    .filter((m) => m.idTipoMovimiento == '2')
    .sort((a, b) => {
      const dateA = a.fecha ? new Date(a.fecha).getTime() : 0;
      const dateB = b.fecha ? new Date(b.fecha).getTime() : 0;
      return dateB - dateA;
    });
  const canjes = movimientos.filter((m)=> m.idTipoMovimiento=='3');
  const liquidacion = movimientos.find((m)=> m.idTipoMovimiento==='4');
  const faltante = movimientos.find((m)=> m.idTipoMovimiento==='6');

  const primerCanje = canjes[0];
  const sinPrimerCanje = canjes.slice(1);


  //TOTALES DE TRANSACCIONES
  const totalParciales = calcularTotalRecibido(retirosParciales);
  const totalLiquidacion: number = calcularTotalRecibido(liquidacion);
  const totalApertura: number = calcularTotalRecibido(apertura);
  const totalRecaudado: number = totalLiquidacion+totalParciales;
  const totalFaltante: number = calcularTotalRecibido(faltante)-calcularTotalEntregado(faltante);


  //Firmas
  /*
  const firmaCajero = await getBase64FromUrl(liquidacion?.firmacajero??'');
  const firmaSupervisor = await getBase64FromUrl(retirosParciales[0].firmasupervisor??'');
  const firmajefeOperativo = await getBase64FromUrl(liquidacion?.firmasupervisor??'');
    */

  // Create retiros parciales table rows
  const retirosRows = retirosParciales.map((retiro, index)  => [
  { text: `${index + 1}`, style: 'tableContent'},
  { text: onlyHourFormated(retiro.fecha ?? ''),style: 'tableContent' },
  { text: formatCurrency(calcularTotalRecibido(retiro)),style: 'tableContent' },
  { text: retiro.nombreSupervisor || '', style: 'tableContent' },
  { text: detalleRetiroParcial(retiro) || '', style: 'tableContent'}
  ]);

  // Create liquidacion table rows
  const liquidacionRows = [
    [
      { text: 'Moneda', style: 'tableContent' },
      { text: '0,01 C', style: 'tableContent' },
      { text: liquidacion?.recibe1c ?? '', style: 'tableContent'},
      { text: (parseInt(liquidacion?.recibe1c ?? '0') * 0.01).toFixed(2), style: 'tableContent' },
      { text: '', border: [false, false, false, false]},
      { text: '', border: [false, false, false, false]},

    ],
    [
      { text: 'Moneda', style: 'tableContent' },
      { text: '0,05 C', style: 'tableContent' },
      { text: liquidacion?.recibe5c ?? '', style: 'tableContent'},
      { text: (parseInt(liquidacion?.recibe5c ?? '0') * 0.05).toFixed(2), style: 'tableContent'},
      { text: '', border: [false, false, false, false] },
      { text: '', border: [false, false, false, false] },
    ],
    [
      { text: 'Moneda', style: 'tableContent' },
      { text: '0,10 C', style: 'tableContent' },
      { text: liquidacion?.recibe10c ?? '', style: 'tableContent' },
      { text: (parseInt(liquidacion?.recibe10c ?? '0') * 0.1).toFixed(2), style: 'tableContent' },
      { text: '', border: [false, false, false, false] },
      { text: '', border: [false, false, false, false] },
    ],
    [
      { text: 'Moneda', style: 'tableContent' },
      { text: '0,25 C', style: 'tableContent' },
      { text: liquidacion?.recibe25c ?? '', style: 'tableContent',},
      { text: (parseInt(liquidacion?.recibe25c ?? '0') * 0.25).toFixed(2), style: 'tableContent'},
      { text: '', border: [false, false, false, false]},
      { text: '', border: [false, false, false, false] },
    ],
    [
      { text: 'Moneda', style: 'tableContent' },
      { text: '0,50 C', style: 'tableContent' },
      { text: liquidacion?.recibe50c ?? '', style: 'tableContent', },
      { text: (parseInt(liquidacion?.recibe50c ?? '0') * 0.5).toFixed(2), style: 'tableContent'},
      { text: '', border: [false, false, false, false] },
      { text: '', border: [false, false, false, false] },
    ],
    [
      { text: 'Moneda', style: 'tableContent' },
      { text: '$ 1', style: 'tableContent' },
      { text: liquidacion?.recibe1d ?? '', style: 'tableContent' },
      { text: (parseInt(liquidacion?.recibe1d ?? '0') * 1).toFixed(2), style: 'tableContent' },
      { text: '',border: [false, false, false, false]},
      { text: '', border: [false, false, false, false] },
    ],
    [
      { text: 'Billete', style: 'tableContent' },
      { text: '$ 5', style: 'tableContent' },
      { text: liquidacion?.recibe5d ?? '', style: 'tableContent'},
      { text: (parseInt(liquidacion?.recibe5d ?? '0') * 5).toFixed(2), style: 'tableContent'},
      { text: '', border: [false, false, false, false]},
      { text: '', border: [false, false, false, false] },
    ],
    [
      { text: 'Billete', style: 'tableContent' },
      { text: '$ 10', style: 'tableContent' },
      { text: liquidacion?.recibe10d ?? '', style: 'tableContent' },
      { text: (parseInt(liquidacion?.recibe10d ?? '0') * 10).toFixed(2), style: 'tableContent'},
      { text: '',border: [false, false, false, false] },
      { text: '', border: [false, false, false, false] },
    ],
    [
      { text: 'Billete', style: 'tableContent' },
      { text: '$ 20', style: 'tableContent' },
      { text: liquidacion?.recibe20d ?? '', style: 'tableContent',},
      { text: (parseInt(liquidacion?.recibe20d ?? '0') * 20).toFixed(2), style: 'tableContent' },
      { text: '', border: [false, false, false, false]},
      { text: '', border: [false, false, false, false] },
    ]
  ];

  const canjeColumns  =[];
  const filasSiguientes = [];

  // !Create APertura table row
    const filaPrimera: any[] = [
      buildAperturaTable(),
        { text: '', border: [false, false, false, false] }
      ];

      // Solo agregar la celda del primer canje si existe
      if (primerCanje) {
        filaPrimera.push(buildCanjeTable(primerCanje));
      }

      if (filaPrimera.length === 2) {
        filaPrimera.push({ text: '' });
      }

    //funcion de fila de Apertura
    function buildAperturaTable() {
      return {
        style: 'table',
        table: {
          widths: [100, 100],
          body: [
            [
              { text: 'Detalle como se entrega la apertura', style: 'tableHeader' },
              { text: 'Detalle como se recibe la apertura', style: 'tableHeader' }
            ],
            [
              {
                ul: [
                  `$20x = ${apertura?.entrega20d || '0'}`,
                  `$10x = ${apertura?.entrega10d || '0'}`,
                  `$5x = ${apertura?.entrega5d || '0'}`,
                  `$1x = ${apertura?.entrega1d || '0'}`,
                ]
              },
              {
                ul: [
                  `$20x = ${apertura?.recibe20d || '0'}`,
                  `$10x = ${apertura?.recibe10d || '0'}`,
                  `$5x = ${apertura?.recibe5d || '0'}`,
                  `$1x = ${apertura?.recibe1d || '0'}`,
                ]
              }
            ],
            [
              { text: `Total: ${formatCurrency(totalApertura)}`, style: 'total' },
              { text: `Total: ${formatCurrency(totalApertura)}`, style: 'total' }
            ]
          ]
        }
      };
    }
    

    // 3) Otros canjes
    for (let i = 0; i < sinPrimerCanje.length; i += 2) {
      const fila: any[] = [];

      fila.push(buildCanjeTable(sinPrimerCanje[i]));

      // Separador si hay segundo canje
      if (sinPrimerCanje[i + 1]) {
        fila.push({ text: '', border: [false, false, false, false] });
        fila.push(buildCanjeTable(sinPrimerCanje[i + 1]));
      } else {
        // Si no hay segundo canje, completa con celda vacía
        fila.push({ text: '' });
        fila.push({ text: '' });
      }

      filasSiguientes.push(fila);
    }


    //Finalmente, insertas esto en tu `content`:
    const tablaGeneral = {
      style: 'table',
      table: {
        widths:  ['auto', 20, 'auto'], 
        body: [filaPrimera,
      ...filasSiguientes]
      },
      layout: 'noBorders'
    };

    //funcion para generar tabla
    function buildCanjeTable(canje:any) {
        return {
          style: 'table',
          margin: [1, 0, 1, 0],
          table: {
            widths: [100, 100],
            body: [
              [
                { text: 'Entrega de monedas y billetes en cabinas', style: 'tableHeader' },
                { text: 'Recepción de monedas y billetes en cabinas', style: 'tableHeader' },
                
              ],
              [
                {
                  ul: [
                    `$20x = ${canje?.entrega20d || '0'}`,
                    `$10x = ${canje?.entrega10d || '0'}`,
                    `$5x = ${canje?.entrega5d || '0'}`,
                    `$1x = ${canje?.entrega1d || '0'}`,
                  ]
                },
                {
                  ul: [
                    `$20x = ${canje?.recibe20d || '0'}`,
                    `$10x = ${canje?.recibe10d || '0'}`,
                    `$5x = ${canje?.recibe5d || '0'}`,
                    `$1x = ${canje?.recibe1d || '0'}`,
                  ]
                }
              ],
              [
                { text: `Total: ${formatCurrency(calcularTotalEntregado(canje))}`, style: 'total' },
                { text: `Total: ${formatCurrency(calcularTotalRecibido(canje))}`, style: 'total' }
              ]
            ]
          }
        };
      }



  const docDefinition: any = {
    content: [
      {  
        table: {
        widths: ['auto', '*'],
        body: [
          [
            // Columna izquierda: logo + texto
            {
              stack: [
                {
                  image: 'data:image/png;base64,' + logoBase64,// tu variable de imagen
                  width: 80,
                  alignment: 'left',
                  margin: [0, 0, 0, 5]
                },
                {
                  text: `${apertura?.idPeaje=='1'?'Peaje Congoma':'Peaje Los Angeles'}`,
                  style: 'branchName',
                  alignment: 'left'
                }
              ],
              border: [false, false, false, false] // sin bordes
            },
            // Columna derecha: el título
            {
              stack:
              [
                {
                text: 'COMPROBANTE DE APERTURA, RENDICIÓN DE CAJA Y REGISTRO DE INCIDENCIAS',
                style: 'title',
                alignment: 'center',
                },
                {
                text: 'Y REGISTRO DE INCIDENCIAS',
                style: 'title',
                alignment: 'center',
                margin: [0, 1, 0, 0] // opcional para centrar vertical
                },
              ],
            }
          ]
        ]
      },
      layout: 'noBorders' // sin bordes de tabla
    },


      // Header table
      {
        style: 'table',
        table: {
          widths: ['*', '*', '*', '*'],
          body: [
            [
              { text: 'Fecha',style: 'tableSubHeader' },
              { text: `${onlyDateFormated(apertura?.fecha??'0') || 'N/A'}`,style: 'tableContent' },
              { text: 'Guía de Remisión',style: 'tableSubHeader'},
              { text: `${apertura?.idturno || 'N/A'}`,style: 'tableContent'},
            ],

            [
              { text: 'Turno',style: 'tableSubHeader' },
              { text: `${apertura?.turno || 'N/A'}`,style: 'tableContent' },
              { text: 'Parte de Trabajo',style: 'tableSubHeader'},
              { text: `${liquidacion?.partetrabajo || 'N/A'}`,style: 'tableContent'},
            ],

            [
              { text: 'Vía',style:'tableSubHeader'},
              { text: `${apertura?.via || 'N/A'}`,style: 'tableContent' },
              { text: 'Nombre del Cajero',style:'tableSubHeader' },
              { text: ` ${apertura?.nombreCajero || 'N/A'}`,style:'tableContent'},
            ],

            [
              { text: `Apertura`,style:'tableSubHeader'},
              { text: `${formatCurrency(totalApertura)}`,style:'tableContent'},
              {text:'',border: [false, false, false, false],},
              {text:'',border: [false, false, false, false],},
            ],
          ]
        }
      },

      { text: ' ', margin: [0, 0, 0, 1] },
            
      // Retiros parciales table
      {
        style: 'table',
        table: {
          widths: ['auto', 'auto', 'auto', '*', '*'],
          body: [
            [
              {text:'RECAUDACIONES PARCIALES', style: 'tableHeader',colSpan:5},
              {text: ''},
              {text: ''},
              {text: ''},
              {text: ''},
            ],
            [
              { text: 'N° Retiro', style: 'tableSubHeader' },
              { text: 'Hora', style: 'tableSubHeader' },
              { text: 'USD', style: 'tableSubHeader' },
              { text: 'Supervisor', style: 'tableSubHeader' },
              { text: 'Denominación', style: 'tableSubHeader' }
            ],
            ...retirosRows,
            [
              { text: '',border: [false, false, false, false]},
              { text: 'TOTAL', style: 'total'},
              { text: formatCurrency(totalParciales), style: 'total' },
              { text: '', colSpan: 2, border: [false, false, false, false]},
              {}
            ]
          ]
        }
      },
      { text: ' ', margin: [0, 0, 0, 1] },
      // Liquidacion table
      {
        style: 'table', 
        table: {
          widths: ['*', '*', '*', '*','*','*'],
          body: [
            [
              { text: 'DETALLE DE LA ÚLTIMA ENTREGA DE VALORES', style: 'tableHeader', colSpan:4},
              { text: '',   },
              { text: '', },
              { text: '',  },
              { text: '', border: [false, false, false, false] },
              { text: '', border: [false, false, false, false] },
            ],
            [
              { text: 'Tipo', style: 'tableSubHeader' },
              { text: 'Denominación', style: 'tableSubHeader' },
              { text: 'Cantidad', style: 'tableSubHeader' },
              { text: '  Valor  ', style: 'tableSubHeader',width:10 },
              { text: '', border: [false, false, false, false] },
              { text: '', border: [false, false, false, false] },
            ],
            ...liquidacionRows,
            [
              { text: 'TOTAL DE LA ÚLTIMA ENTREGA DE VALORES (b)', style: 'tableSubHeader', colSpan: 3 },
              {},
              {},
              { text: formatCurrency(totalLiquidacion), style: 'tableSubHeader' },
              { text: '',border: [false, false, false, false]   },
              { text: '', border: [false, false, false, false] },

            ],
            [
              { text: 'VALOR TOTAL DE RECAUDACIÓN (total a + total b)', style: 'tableSubHeader', colSpan: 4 },
              {},
              {},
              { text: '',  },
              { text: formatCurrency(totalRecaudado), style: 'tableSubHeader' },
              { text: '', border: [false, false, false, false] },
            ]
          ]
        }
      },
      
      // Total in words
      { text: `${numberToWords(totalRecaudado)} (USD) DOLARES ESTADOUNIDENSES`, style: 'valorEscrito'},
      { text: ' ', margin: [0, 0, 0, 0.2] },
      // Anulaciones, simulaciones, etc.
      {
        style: 'table',
        table: {
          widths: [70,40, 40],
          body: [
            [
              { text: 'ANULACIONES', style: 'tableSubHeader' },
              { text: `${liquidacion?.anulaciones || '0'}`,style: 'tableContent' },
              { text: `${formatCurrency(parseInt(liquidacion?.valoranulaciones ?? '0'))}`,style: 'tableContent' },
            ],
            [
              { text: 'SIMULACIONES', style: 'tableSubHeader' },
              { text: `${liquidacion?.simulaciones || '0'}`,style: 'tableContent'},
              { text: `${formatCurrency(parseInt(liquidacion?.valorsimulaciones ?? '0'))}`,style: 'tableContent' },
            ],
            [
              { text: 'FALTANTES', style: 'tableSubHeader' },
              { text: formatCurrency(totalFaltante),style: 'tableContent',colSpan:2 },
              {}
            ],
            [
              { text: 'SOBRANTES', style: 'tableSubHeader' },
              { text: `$ ${liquidacion?.sobrante}`,style: 'tableContent',colSpan:2},
              {},
            ],
          ]
        }
      },
      
      {text: ' ', margin: [0, 0, 0, 0.2] },

      // Signatures
      {
        style: 'signature',
        table: {
          widths: ['*', '*', '*'],
          body: [
            [
              { text: 'VALORES RECIBIDOS Y ENTREGADOS A CONFORMIDAD', style: 'tableHeader',colSpan:3 },
              { text: '', style: 'tableHeader' },
              { text: '', style: 'tableHeader' }
            ],
            [
              { text: 'Cajero', style: 'tableSubHeader' },
              { text: 'Supervisor', style: 'tableSubHeader' },
              { text: 'Jefe Operativo', style: 'tableSubHeader' }
            ],
            [
              {
                stack: [
                  { text: liquidacion?.nombreCajero || 'N/A' ,style: 'tableContent' },
                 // { image: firmaCajero, width: 80, height: 40, alignment: 'center', margin: [0, 5, 0, 0] }
                ],
              },

              {
                stack: [
                  {   text: retirosParciales[0]?.nombreSupervisor ?? apertura?.nombreSupervisor,style: 'tableContent'  },
                 // { image: firmaSupervisor, width: 80, height: 40, alignment: 'center', margin: [0, 5, 0, 0] }
                ],
              },

              {
                stack: [
                  { text: liquidacion?.nombreSupervisor || '',style: 'tableContent'  }, // or jefeOperativo if available
                 // { image: firmajefeOperativo, width: 80, height: 40, alignment: 'center', margin: [0, 5, 0, 0] }
                ],
              },
              
            ],
            ],
          
        }
      },
      
      // Page 2 - Reporte de Canje y Apertura
       { text: '', style: 'header', pageBreak: 'before' },
       {
        table: {
        widths: ['auto', '*'],
        body: [
          [
            {
              stack: [
                {
                  image: 'data:image/png;base64,' + logoBase64,// tu variable de imagen
                  width: 80,
                  alignment: 'left',
                  margin: [0, 0, 0, 5]
                },
                {
                  text: `${apertura?.idPeaje=='1'?'Peaje Congoma':'Peaje Los Angeles'}`,
                  style: 'branchName',
                  alignment: 'left'
                }
              ],
              border: [false, false, false, false] // sin bordes
            },
            // Columna derecha: el título
            {
              stack:
              [
              
                {
                  text: 'REPORTE DE CANJE Y APERTURA',
                  style: 'title',
                  alignment: 'center',
                },
                {
                  text: ' ',
                  style: 'title',
                  alignment: 'center',
                  margin: [0, 1, 0, 0] // opcional para centrar vertical
                },
              ],
            }
          ]
        ]
      },
      layout: 'noBorders' // sin bordes de tabla
    },

      // Header table
      {
        style: 'table',
        table: {
          widths: ['*', '*', '*', '*'],
          body: [
             [
              { text: 'Nombre del Cajero',style:'tableSubHeader' },
              { text: ` ${apertura?.nombreCajero || 'N/A'}`,style:'tableContent'},
              { text: 'Vía',style:'tableSubHeader'},
              { text: `${apertura?.via || 'N/A'}`,style: 'tableContent' },
            ],
            [
              { text: 'Fecha',style: 'tableSubHeader' },
              { text: `${onlyDateFormated(apertura?.fecha??'0') || 'N/A'}`,style: 'tableContent' },
              { text: 'Turno',style: 'tableSubHeader' },
              { text: `${apertura?.turno || 'N/A'}`,style: 'tableContent' },
            ],

            [
              { text: `Apertura`,style:'tableSubHeader'},
              { text: `${formatCurrency(totalApertura)}`,style:'tableContent'},
              {text:'',border: [false, false, false, false],},
              {text:'',border: [false, false, false, false],},
            ],
          ]
        }
      },
      {text: ' ', margin: [0, 0, 0, 0.2] },
    
      tablaGeneral,
      
      
      
    ],
    styles
  };


  return new Promise<string>((resolve) => {
    pdfMake.createPdf(docDefinition).getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      resolve(url);
    });
  });
};

export default generatePDF;