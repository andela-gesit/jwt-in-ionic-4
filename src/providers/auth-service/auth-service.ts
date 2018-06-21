import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

let apiUrl = "apiurlgoeshere"

@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello AuthServiceProvider Provider');
  }

  signIn(credentials, endpoint) {
    return new Promise((resolve, reject) => {
      this.http.post(`${apiUrl}token/${endpoint}`, credentials).subscribe(res => {
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  }

  verifyToken() {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((token) => {
        let headers = new HttpHeaders().set("Authorization", "Bearer " + token)
        this.http.post(`${apiUrl}token/validate`, { headers }, { headers }).subscribe(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
      }).catch(err => {
        reject(err)
      })
    })
  }
}
