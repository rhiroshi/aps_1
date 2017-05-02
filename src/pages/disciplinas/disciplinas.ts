import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SQLStorage } from '../../providers/sql-storage';
import { AuthService } from '../../providers/auth-service';
/**
 * Generated class for the Disciplinas page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-disciplinas',
  templateUrl: 'disciplinas.html',
})
export class Disciplinas {

	public disciplinas = [];
	public usuarioAtual = this.auth.getLoginInfo();
	constructor(public auth: AuthService, public db: SQLStorage, public modal: ModalController, public navCtrl: NavController, public navParams: NavParams) {
		if (this.auth.getLoginInfo() == null || this.auth.getLoginInfo() == undefined) {
			this.navCtrl.setRoot('Login');
		} else {
			this.atualizarLista();
		}
  }

  novaDisciplina() {
	  let modal = this.modal.create('CadastroDisciplina');
	  modal.onDidDismiss(res => {
		  this.atualizarLista();
	  });
	  modal.present();
  }

  abreDisciplina(disciplina) {
	  this.navCtrl.push('TabsDisciplina', { disciplina: disciplina });
  }

  atualizarLista() {
	  this.disciplinas = [];
	  this.db.query('SELECT * FROM disciplina WHERE disciplina.usuario = ?', [this.usuarioAtual.usuario]).then(resultado => {
		  let res = resultado.res.rows;
		  for (let i = 0; i < res.length; i++) {
			  let disciplina = { id: res.item(i).id, nome: res.item(i).nome, codigo: res.item(i).codigo, usuario: res.item(i).usuario };
			  this.disciplinas.push(disciplina);
		  }
	  });
  }

  ionViewDidLoad() {
  }

}
