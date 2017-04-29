import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const DB_NAME: string = '__ionicstorage';
const win: any = window;

export const isFunction = (val: any) => typeof val === 'function';
export const isObject = (val: any) => typeof val === 'object';
export const isArray = Array.isArray;

@Injectable()
export class SQLStorage {

    static BACKUP_LOCAL = 2;
    static BACKUP_LIBRARY = 1;
    static BACKUP_DOCUMENTS = 0;
    private _db: any;

    constructor(public platform: Platform, public sqlite: SQLite) { }

    db() {
        return this._db;
    }

    create(db_name) {

		let dbOptions = this.defaults({}, {
			name: db_name,
			backupFlag: 2,
			existingDatabase: false
		});

		if (win.sqlitePlugin && this.platform.is('cordova')) {
			let location = this._getBackupLocation(dbOptions.backupFlag);

			this._db = win.sqlitePlugin.openDatabase(this.assign({
				name: dbOptions.name,
				location: location,
				createFromLocation: dbOptions.existingDatabase ? 1 : 0
			}, dbOptions));

		} else {
			console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');

			this._db = win.openDatabase(dbOptions.name, '1.0', 'database', 5 * 1024 * 1024);
		}
		this._tryInit();

    }

    _getBackupLocation(dbFlag: number): number {
		switch (dbFlag) {
			case SQLStorage.BACKUP_LOCAL:
				return 2;
			case SQLStorage.BACKUP_LIBRARY:
				return 1;
			case SQLStorage.BACKUP_DOCUMENTS:
				return 0;
			default:
				throw Error('Invalid backup flag: ' + dbFlag);
		}
    }

    // Initialize the DB with our required tables
    _tryInit() {
		this.query('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)').catch(err => {
			console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
		});
    }

    /**
     * Perform an arbitrary SQL operation on the database. Use this method
     * to have full control over the underlying database through SQL operations
     * like SELECT, INSERT, and UPDATE.
     *
     * @param {string} query the query to run
     * @param {array} params the additional params to use for query placeholders
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    query(query: string, params = []): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				this._db.transaction((tx) => {
					tx.executeSql(query, params,
						(tx, res) => resolve({ tx: tx, res: res }),
						(tx, err) => reject({ tx: tx, err: err }));
				},
					(err) => reject({ err: err }));
			} catch (err) {
				reject({ err: err });
			}
		});
    }

    /**
     * Get the value in the database identified by the given key.
     * @param {string} key the key
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    get(key: string): Promise<any> {
		return this.query('select key, value from kv where key = ? limit 1', [key]).then(data => {
			if (data.res.rows.length > 0) {
				return data.res.rows.item(0).value;
			}
		});
    }

    /**
    * Set the value in the database for the given key. Existing values will be overwritten.
    * @param {string} key the key
    * @param {string} value The value (as a string)
    * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
    */
    set(key: string, value: string): Promise<any> {
		return this.query('insert or replace into kv(key, value) values (?, ?)', [key, value]);
    }

    /**
    * Remove the value in the database for the given key.
    * @param {string} key the key
    * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
    */
    remove(key: string): Promise<any> {
		return this.query('delete from kv where key = ?', [key]);
    }

    /**
    * Clear all keys/values of your database.
    * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
    */
    clear(): Promise<any> {
		return this.query('delete from kv');
    }


    assign(...args: any[]): any {
		if (typeof Object.assign !== 'function') {
			// use the old-school shallow extend method
			return this._baseExtend(args[0], [].slice.call(args, 1), false);
		}

		// use the built in ES6 Object.assign method
		return Object.assign.apply(null, args);
	}

	/**
	 * Apply default arguments if they don't exist in
	 * the first object.
	 * @param the destination to apply defaults to.
	 */
	defaults(dest: any, ...args: any[]) {
		for (var i = arguments.length - 1; i >= 1; i--) {
			var source = arguments[i];
			if (source) {
				for (var key in source) {
					if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
						dest[key] = source[key];
					}
				}
			}
		}
		return dest;
	}

	_baseExtend(dst: any, objs: any, deep: boolean) {
		for (var i = 0, ii = objs.length; i < ii; ++i) {
			var obj = objs[i];
			if (!obj || !isObject(obj) && !isFunction(obj)) continue;
			var keys = Object.keys(obj);
			for (var j = 0, jj = keys.length; j < jj; j++) {
				var key = keys[j];
				var src = obj[key];

				if (deep && isObject(src)) {
					if (!isObject(dst[key])) dst[key] = isArray(src) ? [] : {};
					this._baseExtend(dst[key], [src], true);
				} else {
					dst[key] = src;
				}
			}
		}

		return dst;
	}
}
