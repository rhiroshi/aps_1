import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroDisciplina } from './cadastro-disciplina';

@NgModule({
  declarations: [
    CadastroDisciplina,
  ],
  imports: [
    IonicPageModule.forChild(CadastroDisciplina),
  ],
  exports: [
    CadastroDisciplina
  ]
})
export class CadastroDisciplinaModule {}
