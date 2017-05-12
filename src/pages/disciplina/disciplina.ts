import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController, App } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { SQLStorage } from '../../providers/sql-storage';
/**
 * Generated class for the Disciplina page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-disciplina',
  templateUrl: 'disciplina.html',
})
export class Disciplina {

	public disciplina = { id: null, nome: '', codigo: '', usuario: '' };
	public docs;
	public ativs;
	public docs_ok;
	public ativs_ok;
	public progDocumentos = 'Nenhum documento';
	public progAtividades = 'Nenhuma atividade';
	public progTotal = 'Nada';

	public usuarioLogado = this.auth.getLoginInfo();

	constructor(public app: App, public alert: AlertController, public toast: ToastController, public db: SQLStorage, public modal: ModalController, public auth: AuthService, public navCtrl: NavController, public navParams: NavParams) {
		if (this.auth.getLoginInfo() == null || this.auth.getLoginInfo() == undefined) {
			this.app.getRootNav().popToRoot().then(() => {
				this.app.getRootNav().setRoot('Login');
			});
		} else {
			this.disciplina = this.navParams.get('disciplina');
			this.atualizaProgresso();
		}
  }
	voltar() {
		this.app.getRootNav().popToRoot().then(() => {
			this.app.getRootNav().setRoot('TabsMain');
		});
	}

	atualizaProgresso() {
		this.db.query('SELECT docs, docs_ok, ativs, ativs_ok FROM' +
			'(SELECT count(id) as docs FROM documento WHERE disciplina = ?)' +
			', (SELECT count(id) as ativs FROM atividade WHERE disciplina = ?)' +
			',(SELECT count(id) as docs_ok FROM documento WHERE disciplina = ? AND entregue = "true")' +
			',(SELECT count(id) as ativs_ok FROM atividade WHERE disciplina = ? AND entregue = "true")', [this.disciplina.id, this.disciplina.id, this.disciplina.id, this.disciplina.id]).then(res => {
			this.docs = res.res.rows.item(0).docs;
			this.ativs = res.res.rows.item(0).ativs;
			this.docs_ok = res.res.rows.item(0).docs_ok;
			this.ativs_ok = res.res.rows.item(0).ativs_ok;
			if (this.docs == 0) {
				this.progDocumentos = 'Nenhum documento';
			} else {
				this.progDocumentos = '(' + this.docs_ok + '/' + this.docs + ') - ' + ((this.docs_ok / this.docs) * 100).toFixed(0) + '%';
			}
			if (this.ativs == 0) {
				this.progAtividades = 'Nenhuma atividade';
			} else {
				this.progAtividades = '(' + this.ativs_ok + '/' + this.ativs + ') - ' + ((this.ativs_ok / this.ativs) * 100).toFixed(0) + '%';
			} if (this.ativs == 0 && this.docs == 0) {
				this.progTotal = 'Nada';
			} else {
				this.progTotal = '(' + (this.ativs_ok + this.docs_ok) + '/' + (this.docs + this.ativs) + ') - ' + (((this.ativs_ok + this.docs_ok) / (this.docs + this.ativs)) * 100).toFixed(0) + '%';
			}
		});
	}

	editar() {
		let modal = this.modal.create('CadastroDisciplina', { disciplina: this.disciplina });
		modal.onDidDismiss(res => {
			this.db.query('SELECT * FROM disciplina WHERE id = ? ', [this.disciplina.id]).then(res => {
				this.disciplina = {
					id: res.res.rows.item(0).id,
					nome: res.res.rows.item(0).nome,
                              codigo: res.res.rows.item(0).codigo,
					usuario: res.res.rows.item(0).usuario
				};
			});
		});
		modal.present();
	}

	excluir() { // O ON DELETE CASCADE NO FUNFA
		let alert = this.alert.create({
			title: 'Confirmação',
			message: 'Tem certeza que deseja excluir essa disciplina?',
			buttons: [
				{
					text: 'Sim',
					handler: () => {
						this.db.query('DELETE FROM disciplina WHERE id = ?', [this.disciplina.id]).then(res => {
							let toast = this.toast.create({
								message: 'Disciplina excluida com sucesso',
								duration: 1500,
                                                position: 'top'
							});
							toast.present();
							this.navCtrl.setRoot('Disciplinas');
						});
					}
				},
				{
					text: 'Não',
					role: 'cancel'
				}
			]
		});
		alert.present();
	}


	ionViewWillEnter() {
		this.atualizaProgresso();
  }

}
