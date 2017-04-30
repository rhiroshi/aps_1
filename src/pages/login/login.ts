import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
      
	public login = { usuario: '', senha: '' };
  constructor(public auth: AuthService, public navCtrl: NavController, public navParams: NavParams) {
  }

  logar() {
	  
	  this.auth.login(this.login).then(res => {
		  console.log('logar : ', res);
	  });
  }

  registrar() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

}
