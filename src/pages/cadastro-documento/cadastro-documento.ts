import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, AlertController, App } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { SQLStorage } from '../../providers/sql-storage';
/**
 * Generated class for the CadastroDocumento page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cadastro-documento',
  templateUrl: 'cadastro-documento.html',
})
export class CadastroDocumento {

	public documento = {
		id: null,
		nome: '',
		dataEntrega: '',
		responsavel: '',
		local: '',
		entregue: false,
            disciplina: ''
	};
	public disciplina = {
		id: null,
		nome: '',
		usuario: ''
	};


	constructor(public app: App, public alert: AlertController, public view: ViewController, public toast: ToastController, public db: SQLStorage, public auth: AuthService, public navCtrl: NavController, public navParams: NavParams) {
		if (this.auth.getLoginInfo() == null || this.auth.getLoginInfo() == undefined) {
			this.app.getRootNav().popToRoot().then(() => {
				this.app.getRootNav().setRoot('Login');
			});
		} else {
			if (this.navParams.get('documento') == null) {
				this.disciplina = this.navParams.get('disciplina');
			} else {
				this.documento = this.navParams.get('documento');
				this.db.query('SELECT * FROM disciplina WHERE id = ?', [this.documento.disciplina]).then(res => {
					this.disciplina = res.res.rows.item(0);
				});
			}
		}
  }

	salvar() {
		if (this.documento.nome == '' || this.documento.dataEntrega == '' || this.documento.responsavel == '' || this.documento.local == '') {
			let toast = this.toast.create({
				message: 'Todos os campos devem estar preenchidos',
				duration: 1500,
                        position: 'top'
			});
			toast.present();
		}else if (this.documento.id == null) {
			this.db.query('INSERT INTO documento(nome, data_entrega, responsavel, local, entregue, disciplina) VALUES (?, ?, ?, ?, ?, ?)', [this.documento.nome, this.documento.dataEntrega, this.documento.responsavel, this.documento.local, this.documento.entregue, this.disciplina.id]).then(res => {
				let toast = this.toast.create({
					message: 'Documento inserido com sucesso',
					duration: 1500,
                              position: 'top'
				});
				toast.present();
				this.fechar();
			});
		} else {
			this.db.query('UPDATE documento SET nome = ?, data_entrega = ?, responsavel = ?, local = ?, entregue = ? WHERE id = ?', [this.documento.nome, this.documento.dataEntrega, this.documento.responsavel, this.documento.local, this.documento.entregue, this.documento.id]).then(res => {
				let toast = this.toast.create({
					message: 'Documento alterado com sucesso',
					duration: 1500,
                              position: 'top'
				});
				toast.present();
				this.fechar();
			});
		}
	}

	excluir() {
		let alert = this.alert.create({
			title: 'Confirmação',
			message: 'Deseja mesmo excluir esse documento? ',
			buttons: [{
				text: 'Sim',
				handler: () => {
					this.db.query('DELETE FROM documento WHERE id = ? ', [this.documento.id]).then(res => {
						let toast = this.toast.create({
							message: 'Documento excluido com sucesso',
							duration: 1500,
							position: 'top'
						});
						toast.present();
						this.view.dismiss();
					});
				}
			}, {
				text: 'Não',
				role: 'cancel'
			}]
		});
		alert.present();
	}

	fechar() {
		this.view.dismiss();
	}

  ionViewDidLoad() {
  }

}
