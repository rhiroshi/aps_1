import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Pesquisa } from './pesquisa';

@NgModule({
  declarations: [
    Pesquisa,
  ],
  imports: [
    IonicPageModule.forChild(Pesquisa),
  ],
  exports: [
    Pesquisa
  ]
})
export class PesquisaModule {}
