import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App,ModalController, AlertController, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { SQLStorage } from '../../providers/sql-storage';
/**
 * Generated class for the Pesquisa page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pesquisa',
  templateUrl: 'pesquisa.html',
})
export class Pesquisa {

	public atividades = [{
		id: null,
		nome: '',
		dataEntrega: '',
		entregue: false,
		disciplina: null
	}];
	public documentos = []
      public pes = this.navParams.get('pesquisa');

	constructor(public modal: ModalController, public alert: AlertController, public toast: ToastController, public db: SQLStorage, public app: App, public auth: AuthService, public navCtrl: NavController, public navParams: NavParams) {
		if (this.auth.getLoginInfo() == null || this.auth.getLoginInfo() == undefined) {
			this.app.getRootNav().popToRoot().then(() => {
				this.app.getRootNav().setRoot('Login');
			});
		} else {
			this.atualizaAtividade(this.pes);
			this.atualizaDocumentos(this.pes);
		}
  }
      
	editarAtividade(ativ) {
		let modal = this.modal.create('CadastroAtividade', {atividade: ativ });
		modal.onDidDismiss(res => {
			this.atualizaAtividade(this.pes);
		});
		modal.present();
	}

	excluirAtividade(ativ) {
		let alert = this.alert.create({
			title: 'Confirmação',
			message: 'Deseja mesmo excluir essa atividade?',
			buttons: [{
				text: 'Sim',
				handler: () => {
					this.db.query('DELETE FROM atividade WHERE id = ?', [ativ.id]).then(res => {
						let toast = this.toast.create({
							message: 'Atividade excluida com sucesso',
							duration: 1500,
							position: 'top'
						});
						toast.present();
						this.atualizaAtividade(this.pes);
					});
				}
			}, {
				text: 'Não',
				role: 'cancel'
			}]
		});
		alert.present();
	}

	entregarAtividade(ativ) {
		let alert = this.alert.create({
			title: 'Entregar',
			message: 'Deseja mesmo entregar essa atividade?',
			buttons: [{
				text: 'Sim',
				handler: () => {
					this.db.query('UPDATE atividade SET entregue = "true" WHERE id = ?', [ativ.id]).then(res => {
						let toast = this.toast.create({
							message: 'Atividade entregue com sucesso',
							duration: 1500,
							position: 'top'
						});
						toast.present();
						this.atualizaAtividade(this.pes);
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

	editarDocumento(doc) {
		let modal = this.modal.create('CadastroDocumento', { documento: doc });
		modal.onDidDismiss(res => {
			this.atualizaDocumentos(this.pes);
		});
		modal.present();
	}

	excluirDocumento(doc) {
		let alert = this.alert.create({
			title: 'Confirmação',
			message: 'Deseja mesmo excluir esse documento? ',
			buttons: [{
				text: 'Sim',
				handler: () => {
					this.db.query('DELETE FROM documento WHERE id = ? ', [doc.id]).then(res => {
						let toast = this.toast.create({
							message: 'Documento excluido com sucesso',
							duration: 1500,
							position: 'top'
						});
						toast.present();
						this.atualizaDocumentos(this.pes);
					});
				}
			}, {
				text: 'Não',
				role: 'cancel'
			}]
		});
		alert.present();
	}

	entregarDocumento(doc) {
		let alert = this.alert.create({
			title: 'Entregar',
			message: 'Deseja mesmo entregar o documento?',
			buttons: [{
				text: 'Sim',
				handler: () => {
					this.db.query('UPDATE documento SET entregue = "true" WHERE id = ?', [doc.id]).then(res => {
						let toast = this.toast.create({
							message: 'Documento entregue com sucesso',
							duration: 1500,
							position: 'top'
						});
						toast.present();
						this.atualizaDocumentos(this.pes);
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


  atualizaDocumentos(pes) {
	  this.documentos = [];
	  this.db.query('SELECT * FROM documento WHERE nome LIKE ?', [pes]).then(resu => {
		  let res = resu.res.rows;
		  for (let i = 0; i < res.length; i++) {
			  let documento = {
				  id: res.item(i).id,
				  nome: res.item(i).nome,
				  dataEntrega: res.item(i).data_entrega,
				  responsavel: res.item(i).responsavel,
				  local: res.item(i).local,
				  entregue: res.item(i).entregue,
				  disciplina: res.item(i).disciplina,
                          disciplinaNome: ''
			  };
			  this.db.query('SELECT nome FROM disciplina WHERE id = ?', [res.item(i).disciplina]).then(res2 => {
				  documento.disciplinaNome = res2.res.rows.item(0).nome;
			  });
			  this.documentos.push(documento);
		  }
	  });
  }

  atualizaAtividade(pes) {
	  this.atividades = [];
	  this.db.query('SELECT * FROM atividade WHERE nome LIKE ? ', [pes]).then(resu => {
		  let res = resu.res.rows;
		  for (let i = 0; i < res.length; i++) {
			  let atividade = {
				  id: res.item(i).id,
				  nome: res.item(i).nome,
				  dataEntrega: res.item(i).data_entrega,
				  entregue: res.item(i).entregue,
				  disciplina: res.item(i).disciplina,
                          disciplinaNome: ''
			  };
			  this.db.query('SELECT nome FROM disciplina WHERE id = ?', [res.item(i).disciplina]).then(res2 => {
				  atividade.disciplinaNome = res2.res.rows.item(0).nome;
			  });
			  this.atividades.push(atividade);
		  }

	  });
	}
  ionViewDidLoad() {
  }

}
