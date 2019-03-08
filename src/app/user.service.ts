import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  authToken : any;

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return localStorage.getItem('id_token') !==  null;
  }

  getUsers(){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/users`,{headers: header});
  }

  getChefs(){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/users/chefs`,{headers: header});
  }

  getUserById(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/users/${id}`,{headers: header});
  }

  addUser(name,lastname,email,password, role){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    const user = {
      name: name,
      last_name: lastname,
      email: email,
      password: password,
      role: role
    }
    return this.http.post(`${this.uri}/users/add`, user,{headers: header});
  }

  updateUser(id, name,lastname,email,password, role){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    const user = {
      name: name,
      last_name: lastname,
      email: email,
      password: password,
      role: role
    }
    return this.http.post(`${this.uri}/users/update/${id}`, user,{headers: header});
  }

  deleteUser(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/users/delete/${id}`,{headers: header});
  }
}
