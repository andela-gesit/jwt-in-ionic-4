import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  username: string
  token: string
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.username = this.navParams.get('username')
    this.token = this.navParams.get('token')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  signOut() {
    this.storage.remove('token')
    this.navCtrl.setRoot(HomePage)
  }
}

