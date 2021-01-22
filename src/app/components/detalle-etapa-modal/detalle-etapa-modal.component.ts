import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { QuillEditorComponent, QuillService } from 'ngx-quill';
import Quill from 'quill';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle-etapa-modal',
  templateUrl: './detalle-etapa-modal.component.html',
  styleUrls: ['./detalle-etapa-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class DetalleEtapaModalComponent implements OnInit {

  @ViewChild('content') content: ModalDirective;

  instrucciones:string;
  instruccionesHTML:SafeHtml;
  editar:boolean=false;


  constructor(
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  }

  open(){
    this.content.show();
  }

  update(){
    this.instruccionesHTML = this._sanitizer.bypassSecurityTrustHtml(this.instrucciones);
    this.editar=!this.editar;
  }

}
