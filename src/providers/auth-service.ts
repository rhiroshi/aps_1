import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { SQLStorage } from '../providers/sql-storage';
/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

export class Login {
	nome: String;
	usuario: String;
	constructor(nome: String, usuario: String) {
		this.nome = nome;
		this.usuario = usuario;
	}
}

@Injectable()
export class AuthService {
	usuarioLogado: Login;

	constructor(public db: SQLStorage){}

	public login(credenciais) {
		let flag = true;

		return new Promise((resolve) => {
			this.db.query(`SELECT count(usuario) as qtd, nome, usuario FROM Login WHERE usuario = ? AND senha = ?`, [credenciais.usuario, credenciais.senha]).then(resultado => {
				let res = resultado.res.rows.item(0);
				if (res.qtd > 0) {
					this.usuarioLogado = new Login(res.nome, res.usuario);
					resolve(true);
				} else {
					resolve(false);
				}
			});
		});
            
	}

	public getLoginInfo(): Login{
		return this.usuarioLogado
	}

	public logout() {
		this.usuarioLogado = null;
	}
      

}
