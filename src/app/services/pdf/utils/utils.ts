import { IMovimiento } from "src/app/models/movimiento";
import { calcularTotalEntregado, calcularTotalRecibido, formatCurrency } from "src/app/utils/movimientos-utils";

// !                                            GENERAL STYLES - PDF
export const styles = {
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


// !                                        CONSOLIDATION-REPORT

export function jefeOperativoRow(movimientos:IMovimiento[]){
      const liquidaciones =  movimientos.filter((m)=> m.idTipoMovimiento=='4');
      return [[
              { text: `Jefe Operativo: ${liquidaciones[liquidaciones.length-1]?.nombreSupervisor??''} - Turno ${liquidaciones[liquidaciones.length-1]?.turno??''}`, 
                border: [false, false, false, false],colSpan:5,style:'title' },
              { text: '', style: 'tableContent', border: [false, false, false, false] },
              { text: '', style: 'tableContent', border: [false, false, false, false] },
              { text: '', style: 'tableContent', border: [false, false, false, false] },
              { text: '', style: 'tableContent', border: [false, false, false, false] },
              { text: '', style: 'tableContent', border: [false, false, false, false] },
              { text: '', style: 'tableContent', border: [false, false, false, false] },
              { text: '', style: 'tableContent', border: [false, false, false, false] },
              { text: '', style: 'tableContent', border: [false, false, false, false] },
              { text: '', style: 'tableContent', border: [false, false, false, false] },
              { text: '', style: 'tableContent', border: [false, false, false, false] },

            ]];


    }

export const tableHeaderConsolidation= [
          [
          
          {text: 'Nombre',style:'tableSubHeader'},  
          {text: 'Via',style:'tableSubHeader'},
          {text: '1era',style:'tableSubHeader'},
          {text: '2da',style:'tableSubHeader'},
          {text: '3era',style:'tableSubHeader'},
          {text: '4ta',style:'tableSubHeader'},
          {text: '5ta',style:'tableSubHeader'},
          {text: '6ta',style:'tableSubHeader'},
          {text: 'Total Retiros',style:'tableSubHeader'},
          {text: 'Ultima Entrega',style:'tableSubHeader'},
          {text: 'Recaudación Total',style:'tableSubHeader'},
          ],
      ];

     export function cloneHeader(header:any[][]) {
          return header.map(row => row.map(cell => ({ ...cell })));
      }

export function recuadacionRow(recaudacion:IMovimiento[]){
       
          const cajeros = [...new Set(recaudacion.map(m => m.nombreCajero))];

            return cajeros.map((cajero)=>{
            const recaudacionParciales = recaudacion.filter((m)=>m.nombreCajero===cajero && m.idTipoMovimiento=='2');
            const liquidacion = recaudacion.filter((m)=>m.nombreCajero===cajero && m.idTipoMovimiento=='4');
            const aperturaVia= recaudacion.find((m)=> m.nombreCajero===cajero && m.idTipoMovimiento=='1')
            const valores = Array.from({length:6},(_,index)=>{
                if(recaudacionParciales.length>index){
                    const movimiento = recaudacionParciales[index];
                    return calcularTotalRecibido(movimiento);
                }
                return 0;
            });

            const totalRetiros = calcularTotalRecibido(recaudacionParciales);
            const ultimaEntrega = calcularTotalRecibido(liquidacion);
            const recaudacionTotal = totalRetiros+ultimaEntrega;
            const via = aperturaVia?.via??'';

            return [
                {text: cajero || '',style: 'tableContent'},
                {text: via,style: 'tableContent'},
                ...valores.map(v => ({ text: v, style: 'tableContent' })),
                {text: totalRetiros, style: 'tableContent'},
                {text: ultimaEntrega.toFixed(2), style: 'tableContent'},
                {text: recaudacionTotal.toFixed(2),style: 'tableContent'},
                ];
        })
    }

    export function totalesRow(movimientos:IMovimiento[]){
      const faltantes = movimientos.filter((m)=> m.idTipoMovimiento=='6');
      const recuadacionTotal =  movimientos.filter((m)=> m.idTipoMovimiento=='4'|| m.idTipoMovimiento=='2');
      const totalFaltante = calcularTotalRecibido(faltantes)-calcularTotalEntregado(faltantes);
      const totalTurno = calcularTotalRecibido(recuadacionTotal)+totalFaltante
      return [[
              { text: 'REPOSICIÓN', style: 'tableSubHeader' },
              { text: totalFaltante, style: 'tableContent' },
              { text: '', style: 'tableContent', border: [false, false, false, false] },
              { text: '', style: 'tableContent', border: [false, false, false, false] },
              { text: '', style: 'tableContent', border: [false, false, false, false] },
              { text: '', style: 'tableContent', border: [false, false, false, false] },
              { text: '', style: 'tableContent', border: [false, false, false, false] },
              { text: '', style: 'tableContent', border: [false, false, false, false] },
              { text: '', style: 'tableContent', border: [false, false, false, false] },
              { text: 'TOTAL TURNO', style: 'tableSubHeader' },
              { text: totalTurno, style: 'tableContent' },
            
            ]];


    }

    //                                !LIQUIDATION REPORT
    //funcion de fila de Apertura
        export function buildAperturaTable(apertura:IMovimiento) {
          const totalApertura: number = calcularTotalRecibido(apertura);
          
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



        // Create liquidacion table rows
          export function liquidacionRows (liquidacion:IMovimiento) {
            return [[
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
            ]]
          };


          //funcion para generar tabla
            export function buildCanjeTable(canje:any) {
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