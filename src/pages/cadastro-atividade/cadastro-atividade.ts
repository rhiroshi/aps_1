import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { SQLStorage } from '../../providers/sql-storage';
/**
 * Generated class for the CadastroAtividade page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cadastro-atividade',
  templateUrl: 'cadastro-atividade.html',
})
export class CadastroAtividade {

	public disciplina = {
		id: null,
		nome: '',
		codigo: '',
		usuario: ''
	};
	public atividade = {
		id: null,
		nome: '',
		dataEntrega: '',
		entregue: false,
            disciplina: null
	};
	public usuarioLogado = this.auth.getLoginInfo();

	constructor(public toast: ToastController, public db: SQLStorage, public view: ViewController, public auth: AuthService, public navCtrl: NavController, public navParams: NavParams) {
		if (this.auth.getLoginInfo() == null || this.auth.getLoginInfo() == undefined) {
			this.navCtrl.setRoot('Login');
		} else {
			if (this.navParams.get('atividade') != null) {
				this.atividade = this.navParams.get('atividade');
				this.db.query('SELECT * FROM disciplina WHERE id = ?', [this.atividade.disciplina]).then(res => {
					this.disciplina = {
						id: res.res.rows.item(0).id,
						nome: res.res.rows.item(0).nome,
						codigo: res.res.rows.item(0).codigo,
						usuario: res.res.rows.item(0).usuario,
					}
				});
			} else {
				this.disciplina = this.navParams.get('disciplina');
			}
		}
  }

	fechar() {
		this.view.dismiss();
	}

	salvar() {
		if (this.atividade.id == null) {
			this.db.query(`INSERT INTO atividade(nome, data_entrega, entregue, disciplina) VALUES(?, ?, ?, ?)`, [this.atividade.nome, this.atividade.dataEntrega, this.atividade.entregue, this.disciplina.id]).then(res => {
				let toast = this.toast.create({
					message: 'Atividade Criada com sucesso',
					duration: 1500,
                              position: 'top'
				});
				toast.present();
				this.fechar();
			});
		} else {
			this.db.query('UPDATE atividade SET nome = ?, data_entrega =?, entregue = ? WHERE id = ?', [this.atividade.nome, this.atividade.dataEntrega, this.atividade.entregue, this.atividade.id]).then(res => {
				let toast = this.toast.create({
					message: 'Atividade salva com sucesso',
					duration: 1500,
					position: 'top'
				});
				toast.present();
				this.fechar();
			});
		}
	}

	excluir() {
		this.db.query('DELETE FROM atividade WHERE id = ?', [this.atividade.id]).then(res => {
			let toast = this.toast.create({
				message: 'Atividade excluida com sucesso',
				duration: 1500,
                        position: 'top'
			});
			toast.present();
			this.fechar();
		});
	}

  ionViewDidLoad() {
  }

}
