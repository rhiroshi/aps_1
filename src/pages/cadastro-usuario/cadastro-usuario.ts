import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public db: SQLStorage, public navCtrl: NavController, public navParams: NavParams) {
  }

  cadastrar() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroUsuario');
  }

}
