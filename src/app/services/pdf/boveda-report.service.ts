import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { IMovimiento } from "src/app/models/movimiento";
import {logoBase64} from "src/assets/images/base64/images-base64"
import { styles } from "./utils/utils";

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

const generateBovedaReport = async (movimientos:IMovimiento[]):Promise<any>=>{

    const docDefinition: any = {
        content: [

        ],
        styles
    };

    return new Promise <string>((resolve)=>{
        pdfMake.createPdf(docDefinition).getBlob((blob)=>{
                const url = URL.createObjectURL(blob);
                resolve (url);
        })
    });
}
export default generateBovedaReport;
