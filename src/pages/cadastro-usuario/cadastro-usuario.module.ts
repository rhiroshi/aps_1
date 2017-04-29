import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroUsuario } from './cadastro-usuario';

@NgModule({
  declarations: [
    CadastroUsuario,
  ],
  imports: [
    IonicPageModule.forChild(CadastroUsuario),
  ],
  exports: [
    CadastroUsuario
  ]
})
export class CadastroUsuarioModule {}
