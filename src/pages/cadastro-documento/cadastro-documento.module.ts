import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroDocumento } from './cadastro-documento';

@NgModule({
  declarations: [
    CadastroDocumento,
  ],
  imports: [
    IonicPageModule.forChild(CadastroDocumento),
  ],
  exports: [
    CadastroDocumento
  ]
})
export class CadastroDocumentoModule {}
