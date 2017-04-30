import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLStorage } from '../../providers/sql-storage';
import { AuthService } from '../../providers/auth-service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	login = this.auth.getLoginInfo();

	constructor(public auth: AuthService, public db: SQLStorage, public navCtrl: NavController) {
  }

	logout() {
		this.auth.logout();
	}

}
