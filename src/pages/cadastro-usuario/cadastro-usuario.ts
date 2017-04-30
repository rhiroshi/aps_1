import { Component } from '@angular/core';
import { ToastController , IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLStorage } from '../../providers/sql-storage';

/**
 * Generated class for the CadastroUsuario page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cadastro-usuario',
  templateUrl: 'cadastro-usuario.html',
})
export class CadastroUsuario {

	public nome = '';
	public usuario = '';
	public senha = '';

  constructor(public toast: ToastController, public db: SQLStorage, public navCtrl: NavController, public navParams: NavParams) {
        
  }

  cadastrar() {
	  if (!this.nome || !this.usuario || !this.senha) {
		  this.toast.create({
			  message: 'Todos os campos devem estar preenchdos!',
			  duration: 2000,
			  position: 'top'
		  });
	  } else {
		  this.db.query('INSERT INTO login VALUES(?,?,?)', [this.nome, this.usuario, this.senha]).then(result => {
			  this.toast.create({
				  message: 'Usuario cadastrado com sucesso!',
				  duration: 1500,
				  position: 'top'
			  });

		  });
	  }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroUsuario');
  }

}
