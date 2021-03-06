﻿import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLStorage } from '../providers/sql-storage';
import { SQLite } from '@ionic-native/sqlite';
import { AuthService } from '../providers/auth-service';
import { MyApp } from './app.component';

@NgModule({
  declarations: [
	  MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
	  MyApp
  ],
  providers: [
	  SQLStorage,
	  SQLite,
	  AuthService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
