import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('username') username
  @ViewChild('password') password
  loading: any

  constructor(public navCtrl: NavController,
    public authService: AuthServiceProvider,
    private alertCtrl: AlertController,
    private loadingController: LoadingController,
    private storage: Storage) {

  }


  ionViewDidLoad() {
    this.showLoader("Loading...")
    this.authService.verifyToken().then(res => {
      this.loading.dismiss()
      this.navCtrl.setRoot(DashboardPage)
    }).catch(err => {
      this.loading.dismiss()
    })
  }

  showLoader(content) {
    this.loading = this.loadingController.create({
      content
    });
 
    this.loading.present();
  }

  showAlert(message) {
    const alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  saveToken(token) {

    this.storage.set('token', token)
  }

  signIn() {
    this.showLoader("Authenticating...")
    let credentials = {
      username: this.username.value,
      password: this.password.value
    }
    this.authService.signIn(credentials, 'token').then(res => {
      let { token } = res || "No token returned"

      console.log("Token Returned", token)
      this.loading.dismiss()
      this.saveToken(token)
      this.navCtrl.setRoot(DashboardPage, {
        username: this.username.value,
        token
      })
    }).catch(err => {
      console.log(err.error, "Error Ob ject")
      let message = err.error.message || "Authentication Failed"
      this.loading.dismiss()
      this.showAlert(message)
    })
  }

}
