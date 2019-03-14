import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  authenticateUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:4000/auth/login', user, {headers: headers})

  }

  getRole(){
    return JSON.parse(this.cookieService.get('user')).role;
  }

  storeUserData(token, user){
    this.cookieService.set('id_token',token,(4/24))
    this.cookieService.set('user', JSON.stringify(user),(4/24))
    this.authToken = token;
    this.user = user;
  }

  logOut(){
    this.authToken = null;
    this.user = null;
    this.cookieService.deleteAll();
  }

  loggedIn(){
    // console.log(this.cookieService.get('id_token'))
    return this.cookieService.get('id_token') != '';
  }

}
