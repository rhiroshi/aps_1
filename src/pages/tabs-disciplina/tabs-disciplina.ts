import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
/**
 * Generated class for the TabsDisciplina page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tabs-disciplina',
  templateUrl: 'tabs-disciplina.html',
})
export class TabsDisciplina {

	private tab1Root: any;
	private tab2Root: any;
	private tab3Root: any;

	public disciplina = this.navParams.data;

	constructor(public auth: AuthService, public navCtrl: NavController, public navParams: NavParams) {
		if (this.auth.getLoginInfo() == null || this.auth.getLoginInfo() == undefined) {
			this.navCtrl.setRoot('Login');
		} else {
			this.tab1Root = 'Disciplina';
			this.tab2Root = 'Documentos';
			this.tab3Root = 'Atividades';
		}
  }

	atualizaProgresso() {
	}

  ionViewDidLoad() {
  }

}
