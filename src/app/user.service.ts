import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get(`${this.uri}/users`);
  }

  getUserById(id){
    return this.http.get(`${this.uri}/users/${id}`);
  }

  addUser(name,lastname,email,password, role){
    const user = {
      name: name,
      last_name: lastname,
      email: email,
      password: password,
      role: role
    }
    return this.http.post(`${this.uri}/users/add`, user);
  }

  updateUser(id, name,lastname,email,password, role){
    const user = {
      name: name,
      last_name: lastname,
      email: email,
      password: password,
      role: role
    }
    return this.http.post(`${this.uri}/users/update/${id}`, user);
  }

  deleteUser(id){
    return this.http.get(`${this.uri}/users/delete/${id}`);
  }
}
