import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

	private tab1Root: any = 'Disciplina';
	private tab2Root: any = 'Documentos';
	private tab3Root: any = 'Atividades';

	public disciplina = this.navParams.data;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

	atualizaProgresso() {
	}

  ionViewDidLoad() {
  }

}
