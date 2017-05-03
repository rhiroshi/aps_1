import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, AlertController } from 'ionic-angular';
import { SQLStorage } from '../../providers/sql-storage';
import { AuthService } from '../../providers/auth-service';
/**
 * Generated class for the Documentos page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-documentos',
  templateUrl: 'documentos.html',
})
export class Documentos {

	public documentos = [];
	public disciplina = {
		id: null,
		nome: '',
            usuario:''
	};
	constructor(public alert: AlertController, public toast: ToastController, public modal: ModalController, public db: SQLStorage, public auth: AuthService, public navCtrl: NavController, public navParams: NavParams) {
		if (this.auth.getLoginInfo() == null || this.auth.getLoginInfo() == undefined) {
			this.navCtrl.setRoot('Login');
		} else {
			this.disciplina = this.navParams.get('disciplina');
			this.atualizarDocumento();
		}
  }

	novoDocumento() {
		let modal = this.modal.create('CadastroDocumento', { disciplina: this.disciplina, documento: null });
		modal.onDidDismiss(res => {
			this.atualizarDocumento();
		});
		modal.present();
	}

	editarDocumento(documento) {
		let modal = this.modal.create('CadastroDocumento', { disciplina: this.disciplina, documento: documento });
		modal.onDidDismiss(res => {
			this.atualizarDocumento();
		});
		modal.present();
	}

	entregar(documento) {
		let alert = this.alert.create({
			title: 'Entregar',
			message: 'Deseja mesmo entregar o documento?',
			buttons: [{
				text: 'Sim',
				handler: () => {
					this.db.query('UPDATE documento SET entregue = "true" WHERE id = ?', [documento.id]).then(res => {
						let toast = this.toast.create({
							message: 'Documento entregue com sucesso',
							duration: 1500,
							position: 'top'
						});
						toast.present();
						this.atualizarDocumento();
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

	atualizarDocumento() {
		this.documentos = [];
		this.db.query('SELECT * FROM documento WHERE disciplina = ?', [this.disciplina.id]).then(resultado => {
			let res = resultado.res.rows;
			for (let i = 0; i < res.length; i++) {
				let doc = {
                              id: res.item(i).id,
					nome: res.item(i).nome, 
					dataEntrega: res.item(i).data_entrega,
					responsavel: res.item(i).responsavel,
					local: res.item(i).local,
					entregue: res.item(i).entregue,
                              disciplina: res.item(i).disciplina
				};
				this.documentos.push(doc);
			}
		});
	}

  ionViewDidLoad() {
  }

}
