import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { SQLStorage } from '../../providers/sql-storage';
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

	constructor(public db: SQLStorage, public modal: ModalController, public navCtrl: NavController, public navParams: NavParams) {
		this.atualizarLista();
  }

  novaDisciplina() {
	  let modal = this.modal.create('CadastroDisciplina');
	  modal.present();
  }

  abreDisciplina(id) {

  }

  atualizarLista() {
	  this.disciplinas = [];
	  this.db.query('SELECT * FROM disciplina').then(resultado => {
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
