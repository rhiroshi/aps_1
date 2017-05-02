import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { SQLStorage } from '../../providers/sql-storage';
/**
 * Generated class for the Disciplina page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-disciplina',
  templateUrl: 'disciplina.html',
})
export class Disciplina {

	public disciplina = { id: null, nome: 's', codigo: '', usuario: '' };


	public usuarioLogado = this.auth.getLoginInfo();

	constructor(public db: SQLStorage, public modal: ModalController, public auth: AuthService, public navCtrl: NavController, public navParams: NavParams) {
		if (this.auth.getLoginInfo() == null || this.auth.getLoginInfo() == undefined) {
			this.navCtrl.setRoot('Login');
		} else {
		}
  }
	voltar() {
		this.navCtrl.push('Disciplinas');
	}

	ionViewDidLoad() {
		this.disciplina = this.navParams.get('disciplina');
  }

}
