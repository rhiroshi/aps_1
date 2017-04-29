import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLStorage } from '../../providers/sql-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	constructor(public db: SQLStorage, public navCtrl: NavController) {
		this.navCtrl.push('CadastroUsuario');
  }

}
