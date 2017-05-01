import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLStorage } from '../providers/sql-storage';
import { AuthService } from '../providers/auth-service';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
      rootPage;

	constructor(auth: AuthService, db: SQLStorage, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
		if (auth.getLoginInfo() == null || auth.getLoginInfo() == undefined) {
			this.rootPage = 'Login';
		} else {
			this.rootPage = 'Disciplinas';
		}

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
          
	    db.create('aps_1');
	    db.query(`CREATE TABLE IF NOT EXISTS login(usuario TEXT PRIMARY KEY, senha TEXT, nome TEXT)`);
	    db.query(`CREATE TABLE IF NOT EXISTS disciplina(id INTEGER PRIMARY KEY AUTOINCREMENT, 
                                                                                              nome TEXT,
                                                                                              codigo TEXT,
                                                                                              usuario TEXT,
                                                                                              FOREIGN KEY(usuario) REFERENCES login(usuario))`);
	    db.query(`CREATE TABLE IF NOT EXISTS atividade(id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                                                              titulo TEXT, 
                                                                                              data_entrega TEXT,
                                                                                              entregue INTEGER,
                                                                                              disciplina INTEGER,
                                                                                              FOREIGN KEY(disciplina) REFERENCES disciplina(id))`);
	    db.query(`CREATE TABLE IF NOT EXISTS documento(id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                                                                nome TEXT, 
                                                                                                data_entrega TEXT,
                                                                                                responsavel TEXT,
                                                                                                local TEXT,
                                                                                                entregue INTEGER,
                                                                                                disciplina INTEGER,
                                                                                                FOREIGN KEY(disciplina) REFERENCES disciplina(id))`);
          
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

