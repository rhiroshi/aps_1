import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';
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
  constructor(public toast: ToastController, public auth: AuthService, public navCtrl: NavController, public navParams: NavParams) {
  }

  logar() {
	  
	  this.auth.login(this.login).then(res => {
		  if (res) {
			  this.navCtrl.setRoot(HomePage);
		  } else {
			  let toast = this.toast.create({
				  message: 'Login e/ou senha inválidos',
				  duration: 1500,
				  position: 'top'
			  });
			  toast.present();
		  }
	  });
  }

  registrar() {
	  this.navCtrl.push('CadastroUsuario');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

}
