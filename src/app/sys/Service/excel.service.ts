import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver'; 

import { DatePipe } from '@angular/common';
import { Table2SheetOpts } from 'xlsx';
// import * as XLSX from 'xlsx';
// import { utils, write } from 'xlsx';
// import { WorkSheet, WorkBook } from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  private datePipe: DatePipe = new DatePipe("");
  constructor() {


  }


  public exportAsExcelFile(arrOfObjs: {}[], excelFileName: string): void {
    import('xlsx').then(xlsx => {
      // console.log(xlsx);
      const worksheet: import('xlsx').WorkSheet = xlsx.utils.json_to_sheet(arrOfObjs);
      console.log('worksheet', worksheet);
      worksheet['!cols'] = []
      const wb: import('xlsx').WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      if (!wb.Workbook) { wb.Workbook = {}; }
      if (!wb.Workbook.Views) { wb.Workbook.Views = []; }
      if (!wb.Workbook.Views[0]) { wb.Workbook.Views[0] = {}; }
      wb.Workbook.Views[0].RTL = true;

      const excelBuffer: BlobPart = xlsx.write(wb, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, excelFileName);
    });
  }
  public exportAsExcelFile2(Table:any, excelFileName: string): void {
    import('xlsx').then(xlsx => {
      // console.log(xlsx);
      const worksheet: import('xlsx').WorkSheet = xlsx.utils.table_to_sheet(Table);
      console.log('worksheet', worksheet);
      worksheet['!cols'] = []
      const wb: import('xlsx').WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      if (!wb.Workbook) { wb.Workbook = {}; }
      if (!wb.Workbook.Views) { wb.Workbook.Views = []; }
      if (!wb.Workbook.Views[0]) { wb.Workbook.Views[0] = {}; }
      wb.Workbook.Views[0].RTL = true;

      const excelBuffer: BlobPart = xlsx.write(wb, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, excelFileName);
    });
  }
  private saveAsExcelFile(buffer: BlobPart, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  
}
