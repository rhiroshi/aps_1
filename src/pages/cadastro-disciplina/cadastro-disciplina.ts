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

	public disciplina = { id: null, nome: '', codigo: '' };
	public usuarioLogado = this.auth.getLoginInfo();
	constructor(public view: ViewController, public toast: ToastController, private auth: AuthService, public db: SQLStorage, public navCtrl: NavController, public navParams: NavParams) {
		if (this.auth.getLoginInfo() == null || this.auth.getLoginInfo() == undefined) {
			this.navCtrl.setRoot('Login');
		} else {
			if (this.navParams.get('disciplina') != null) {
				this.disciplina = this.navParams.get('disciplina');
			}
		}
  }

	salvar() {
		if (this.disciplina.nome == '' || this.disciplina.codigo == '') {
			let toast = this.toast.create({
				message: 'Os campos devem estar preenchidos',
				duration: 1500,
				position: 'top'
			});
			toast.present();
		} else if (this.disciplina.id != null) {
			this.db.query('UPDATE disciplina SET nome = ?, codigo = ? WHERE id = ?', [this.disciplina.nome, this.disciplina.codigo, this.disciplina.id]).then(res => {
				let toast = this.toast.create({
					message: 'Disciplina atualizada com sucesso',
					duration: 1500,
                              position: 'top'
				});
				toast.present();
				this.fechar();
			});
		}else{
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
