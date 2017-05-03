import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { SQLStorage } from '../../providers/sql-storage';
/**
 * Generated class for the Atividade page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-atividades',
  templateUrl: 'atividades.html',
})
export class Atividades {

	public atividades = [];
	public disciplina = {
		id: null,
		nome: '',
            usuario: null
	}

	constructor(public alert: AlertController, public toast: ToastController, public db: SQLStorage, public modal: ModalController, public auth: AuthService, public navCtrl: NavController, public navParams: NavParams) {
		if (this.auth.getLoginInfo() == null || this.auth.getLoginInfo() == undefined) {
			this.navCtrl.setRoot('Login');
		} else {
			this.disciplina = this.navParams.get('disciplina');
			this.atualizaAtividade();
		}
  }


	novaAtividade() {
		let modal = this.modal.create('CadastroAtividade', { disciplina: this.disciplina, atividade: null });
		modal.onDidDismiss(res => {
			this.atualizaAtividade();
		});
		modal.present();
	}

	editaAtividade(atividade) {
		let modal = this.modal.create('CadastroAtividade', { disciplina: this.disciplina, atividade: atividade });
		modal.onDidDismiss(res => {
			this.atualizaAtividade();
		});
		modal.present();
	}

	atualizaAtividade() {
		this.atividades = [];
		this.db.query('SELECT * FROM atividade WHERE disciplina = ? ', [this.disciplina.id]).then(resultado => {
			let res = resultado.res.rows;
			for (let i = 0; i < res.length; i++) {
				let ati = { id: res.item(i).id, nome: res.item(i).nome, dataEntrega: res.item(i).data_entrega, entregue: res.item(i).entregue, disciplina: res.item(i).disciplina };
				this.atividades.push(ati);
			}
		});
	}

	entregar(atividade) {
		let alert = this.alert.create({
			title: 'Entregar',
			message: 'Deseja mesmo entregar essa atividade?',
			buttons: [{
				text: 'Sim',
				handler: () => {
					this.db.query('UPDATE atividade SET entregue = "true" WHERE id = ?', [atividade.id]).then(res => {
						let toast = this.toast.create({
							message: 'Atividade entregue com sucesso',
							duration: 1500,
							position: 'top'
						});
						toast.present();
						this.atualizaAtividade();
					});
				}
			},
			{
				text: 'Não',
				role: 'cancel'
			}]
		});
		alert.present();
	}

  ionViewDidLoad() {
  }

}
