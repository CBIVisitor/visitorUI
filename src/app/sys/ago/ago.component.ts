import { Component, OnInit } from '@angular/core';
import { TimeagoIntl } from 'ngx-timeago';
import { strings as englishStrings } from 'ngx-timeago/language-strings/ar';
import * as XLSX from 'xlsx';
import { AgoService } from './ago.service';

@Component({
  selector: 'app-ago',
  templateUrl: './ago.component.html',
  styleUrls: ['./ago.component.scss']
})


export class AgoComponent implements OnInit {
  agoService: AgoService = new AgoService();

  constructor(intl: TimeagoIntl, agoService: AgoService ) {
    intl.strings = englishStrings;
    intl.changes.next();

    
  }
  title = 'angular-app';
  fileName = 'ExcelSheet.xlsx';
  userList:any = []
  ngOnInit(): void {
    this.userList = [

      {

        "id": 1, 
        "name": "Leanne Graham", 
        "username": "Bret", 
        "email": "Sincere@april.biz" 
      }, 
      {

        "id": 2,

        "name": "Ervin Howell",

        "username": "Antonette",

        "email": "Shanna@melissa.tv"

      },

      {

        "id": 3,

        "name": "Clementine Bauch",

        "username": "Samantha",

        "email": "Nathan@yesenia.net"

      },

      {

        "id": 4,

        "name": "Patricia Lebsack",

        "username": "Karianne",

        "email": "Julianne.OConner@kory.org"

      },

      {

        "id": 5,

        "name": "Chelsey Dietrich",

        "username": "Kamren",

        "email": "Lucio_Hettinger@annie.ca"

      }

    ]
   // this.agoService.exportAsExcelFile(this.userList, "Ahmed")


  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
     
    
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }
   
}
