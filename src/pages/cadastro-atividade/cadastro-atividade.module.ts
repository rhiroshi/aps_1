import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroAtividade } from './cadastro-atividade';

@NgModule({
  declarations: [
    CadastroAtividade,
  ],
  imports: [
    IonicPageModule.forChild(CadastroAtividade),
  ],
  exports: [
    CadastroAtividade
  ]
})
export class CadastroAtividadeModule {}
