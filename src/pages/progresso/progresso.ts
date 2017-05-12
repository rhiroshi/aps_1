import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { SQLStorage } from '../../providers/sql-storage';
/**
 * Generated class for the Progresso page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-progresso',
  templateUrl: 'progresso.html',
})
export class Progresso {

	public disciplinas = [{
		id: null,
		nome: '',
		codigo: '',
		usuario: '',
		progAtividades: '',
		progDocumentos: '',
		progTotal: ''
	}];

	public usuario = this.auth.getLoginInfo();

	constructor(public app: App, public auth: AuthService, public db: SQLStorage, public navCtrl: NavController, public navParams: NavParams) {
		if (this.auth.getLoginInfo() == null || this.auth.getLoginInfo() == undefined) {
			this.app.getRootNav().popToRoot().then(() => {
				this.app.getRootNav().setRoot('Login');
			});
		} else {
			this.atualizaProgresso();
		}
      }

	atualizaProgresso() {
		this.disciplinas = [];
		this.db.query('SELECT * FROM disciplina WHERE usuario = ?', [this.usuario.usuario]).then(resultado => {
			let res = resultado.res.rows;
			for (let i = 0; i < res.length; i++) {
				this.db.query('SELECT * FROM ' +
					'(SELECT count(id) as ativs FROM atividade WHERE disciplina = ?),' +
					'(SELECT count(id) as docs FROM documento WHERE disciplina = ?),' +
					'(SELECT count(id) as ativs_ok FROM atividade WHERE entregue = "true" AND disciplina = ?),' +
					'(SELECT count(id) as docs_ok FROM documento WHERE entregue = "true" AND disciplina = ?)', [res.item(i).id, res.item(i).id, res.item(i).id, res.item(i).id]).then(resultado2 => {
						let res2 = resultado2.res.rows;
						let ativs = '';
						let docs = '';
						let total = '';
						if (res2.item(0).ativs == 0) {
							ativs = 'Nenhuma atividade';
						} else {
							ativs = '(' + res2.item(0).ativs_ok + '/' + res2.item(0).ativs + ') - ' + ((res2.item(0).ativs_ok / res2.item(0).ativs) * 100).toFixed(0) + '%';
						}
						if (res2.item(0).docs == 0) {
							docs = 'Nenhum documento';
						} else {
							docs = '(' + res2.item(0).docs_ok + '/' + res2.item(0).docs + ') - ' + ((res2.item(0).docs_ok / res2.item(0).docs) * 100).toFixed(0) + '%';
						}
						if (res2.item(0).ativs == 0 || res.item(0).docs == 0) {
							total = 'Nada';
						} else {
							total = '(' + (res2.item(0).docs_ok + res2.item(0).ativs_ok) + '/' + (res2.item(0).ativs + res2.item(0).docs) + ') - ' + (((res2.item(0).ativs_ok + res2.item(0).docs_ok) / (res2.item(0).ativs + res2.item(0).docs)) * 100).toFixed(0) + '%';
						}
						let disciplina = {
							id: res.item(i).id,
							nome: res.item(i).nome,
							codigo: res.item(i).codigo,
                                          usuario: res.item(i).usuario,
							progAtividades: ativs,
							progDocumentos: docs,
							progTotal: total
						};
						this.disciplinas.push(disciplina);
					});
			}
		});
	}

	ionViewWillView() {
		this.atualizaProgresso();
  }

}
