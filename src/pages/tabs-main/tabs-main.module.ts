import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsMain } from './tabs-main';

@NgModule({
  declarations: [
    TabsMain,
  ],
  imports: [
    IonicPageModule.forChild(TabsMain),
  ],
  exports: [
    TabsMain
  ]
})
export class TabsMainModule {}
