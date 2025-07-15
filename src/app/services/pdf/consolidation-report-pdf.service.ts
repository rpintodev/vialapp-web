import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { IMovimiento } from "src/app/models/movimiento";
import {logoBase64} from "src/assets/images/base64/images-base64"
import { calcularFaltante, calcularTotalEntregado, calcularTotalRecibido, detalleRetiroParcial, formatCurrency, getBase64FromUrl, numberToWords, onlyDateFormated, onlyHourFormated } from "src/app/utils/movimientos-utils";
import { cloneHeader, jefeOperativoRow, recuadacionRow, styles, tableHeaderConsolidation, totalesRow } from "./utils/utils";
// import { variable64 } from "../../assets/img";


(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

const genterateConsolidationReport = async (movimientos: IMovimiento[]): Promise<any>=>{

    //Turno 1
    const recaudacionT1 = movimientos.filter((m) => m.turno == '1' && (m.idTipoMovimiento == '1'|| m.idTipoMovimiento == '2'|| m.idTipoMovimiento == '4'||m.idTipoMovimiento == '6'));
    const recaudacionT2 = movimientos.filter((m) => m.turno == '2' && (m.idTipoMovimiento == '1'||m.idTipoMovimiento == '2'|| m.idTipoMovimiento == '4'||m.idTipoMovimiento == '6'));
    const recaudacionT3 = movimientos.filter((m) => m.turno == '3' && (m.idTipoMovimiento == '1'||m.idTipoMovimiento == '2'|| m.idTipoMovimiento == '4'||m.idTipoMovimiento == '6'));
    const liquidaciones = movimientos.filter((m)=> m.idTipoMovimiento=='4' && m.turno=='1');
    const supervisor1 = movimientos.find((m)=> m.idTipoMovimiento=='1' && m.turno=='1');
    const supervisor2 = movimientos.find((m)=> m.idTipoMovimiento=='1' && m.turno=='3');

    const recaudacion3T = movimientos.filter((m)=> (m.idTipoMovimiento=='4' || m.idTipoMovimiento=='2' )&& (m.turno=='1' ||m.turno=='2' ||m.turno=='3' ));
    const faltante3T = movimientos.filter((m)=> m.idTipoMovimiento=='6' &&(m.turno=='1' ||m.turno=='2' ||m.turno=='3' ));
    const recuadacionTotal = calcularTotalRecibido(recaudacion3T)+calcularFaltante(faltante3T);



    const docDefinition: any ={
        content:[
            {
                table:{
                    widths:['auto','*'],
                    body: [
                        [   
                            {
                                stack:[
                                    {
                                        image:'data:image/png;base64,'+logoBase64,
                                        width: 80,
                                        alignment:'left',
                                        margin: [0,0,0,5]
                                    },
                                    {
                                        text:`${liquidaciones.find((m)=>m.id)?.idPeaje=='1'?'Peaje Congoma':'Peaje Los Angeles'}`,
                                        style: 'branchName',
                                        alignment: 'left'
                                    },
                                ],
                                border: [false,false,false,false,]
                            },
                            {
                                stack:[
                                    {
                                        text: 'CONSOLIDADO DIARIO DE APERTURA, RENDICIÓN DE CAJA',
                                        style: 'title',
                                        alignment: 'center',
                                    },
                                    {
                                        text: 'E INCIDENCIAS',
                                        style: 'title',
                                        alignment: 'center',
                                        margin: [0, 1, 0, 0] // opcional para centrar vertical
                                    },
                                ],
                            },
                        ]
                    ]
                },
            layout: 'noBorders' // sin bordes de tabla
            },
            {
                style:'table',
                table: {
                    widths: ['*','*','*','*'],
                    body: [
                        [
                            {text: 'Fecha',style: 'tableSubHeader'},
                            {text: `${onlyDateFormated(recaudacionT1[0].fecha??'')}`,style:'tableContent'},
                            {text: 'Guia de Remision', style: 'tableSubHeader'},
                            {text: '',style: 'tableContent'},
                        ],
                        [
                            {text: 'Recuadación total',style: 'tableSubHeader'},
                            {text: `${formatCurrency(recuadacionTotal)}`,style:'tableContent'},
                            {text: '', border: [false,false,false,false]},
                            {text: '',border: [false,false,false,false]},
                        ],
                    ]
                },
            },
           
            {
                style: 'table',
                table: {
                    widths: [80,15,25,25,25,25,25,25,50,60,70],
                    headerRows: 1,
                    body: [
                            ...jefeOperativoRow(recaudacionT1),                    
                            ...cloneHeader(tableHeaderConsolidation),
                            ...recuadacionRow(recaudacionT1),
                            ...totalesRow(recaudacionT1),
                    ],
                }
            },
            
            {
                style: 'table',
                table: {
                    headerRows: 1,
                    widths: [80,15,25,25,25,25,25,25,50,60,70],
                    body: [
                            ...jefeOperativoRow(recaudacionT2),                    
                            ...cloneHeader(tableHeaderConsolidation),
                            ...recuadacionRow(recaudacionT2),
                            ...totalesRow(recaudacionT2),
                    ],
                }
            },
           
            {
                style: 'table',
                table: {
                    headerRows: 1,
                    widths: [80,15,25,25,25,25,25,25,50,60,70],
                    body: [
                            ...jefeOperativoRow(recaudacionT3),
                            ...cloneHeader(tableHeaderConsolidation),
                            ...recuadacionRow(recaudacionT3),
                            ...totalesRow(recaudacionT3),
                    ],
                }
            },


            { text: ' ', margin: [0, 0, 0, 1] },
            // Signatures
            {
                style: 'signature',
                table: {
                widths: ['*', '*'],
                body: [
                    [
                        { text: 'RESPONSABLE DE VALORES', style: 'tableHeader',colSpan:2 },
                        { text: '', style: 'tableHeader' },
                    ],
                    [
                        { text: 'Supervisor Turno 1', style: 'tableSubHeader' },
                        { text: 'Supervisor Turno 2', style: 'tableSubHeader' },
                    ],
                    [
                    {
                        stack: [
                        { text: `${supervisor1?.nombreSupervisor}` || 'N/A' ,style: 'tableContent' },
                        // { image: firmaCajero, width: 80, height: 40, alignment: 'center', margin: [0, 5, 0, 0] }
                        ],
                    },

                    {
                        stack: [
                        {   text: `${supervisor2?.nombreSupervisor}`,style: 'tableContent'  },
                        // { image: firmaSupervisor, width: 80, height: 40, alignment: 'center', margin: [0, 5, 0, 0] }
                        ],
                    },

                    
                    ],
                    ],
                
                }
            },
      
        ],
        styles
    };

    return new Promise <string>((resolve)=>{
    pdfMake.createPdf(docDefinition).getBlob((blob)=>{
            const url = URL.createObjectURL(blob);
            resolve (url);
        })
    });
};

export default genterateConsolidationReport;



