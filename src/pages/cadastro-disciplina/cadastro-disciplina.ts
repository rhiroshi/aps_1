import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { SQLStorage } from '../../providers/sql-storage';
import { AuthService } from '../../providers/auth-service';
/**
 * Generated class for the CadastroDisciplina page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cadastro-disciplina',
  templateUrl: 'cadastro-disciplina.html',
})
export class CadastroDisciplina {

	public disciplina = { nome: '', codigo: '' };
	public usuarioLogado = this.auth.getLoginInfo();
	constructor(public view: ViewController, public toast: ToastController, private auth: AuthService, public db: SQLStorage, public navCtrl: NavController, public navParams: NavParams) {
  }

	cadastrar() {
		if (this.disciplina.nome == '' || this.disciplina.codigo == '') {
			let toast = this.toast.create({
				message: 'Os campos devem estar preenchidos',
				duration: 1500,
				position: 'top'
			});
			toast.present();
		} else {
			this.db.query('INSERT INTO disciplina(nome, codigo, usuario) VALUES(?,?,?)', [this.disciplina.nome, this.disciplina.codigo, this.usuarioLogado.usuario]).then((res) => {
				let toast = this.toast.create({
					message: 'Disciplina cadastrada com sucesso',
					duration: 1500,
					position: 'top'
				});
				toast.present();
			});
			this.fechar();
		}
	}

	fechar() {
		this.view.dismiss();
	}

  ionViewDidLoad() {
  }

}
