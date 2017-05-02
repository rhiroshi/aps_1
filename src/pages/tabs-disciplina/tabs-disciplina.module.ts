import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsDisciplina } from './tabs-disciplina';

@NgModule({
  declarations: [
    TabsDisciplina,
  ],
  imports: [
    IonicPageModule.forChild(TabsDisciplina),
  ],
  exports: [
    TabsDisciplina
  ]
})
export class TabsDisciplinaModule {}
