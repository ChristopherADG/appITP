import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProviderService {

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

  getProviders(){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/providers`,{headers: header});
  }

  getProviderById(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/providers/${id}`,{headers: header});
  }

  addProvider(name,contact, email,phone, rfc, pc,street, number, ext_number,colony){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    const provider = {
      name: name,
      contact: contact, 
      email: email,
      phone:phone,
      rfc: rfc,
      pc: pc,
      street: street,
      number: number,
      ext_number: ext_number,
      colony: colony
    }
    return this.http.post(`${this.uri}/providers/add`, provider,{headers: header});
  }

  updateProvider(id,name,contact,email,phone, rfc, pc,street, number, ext_number,colony){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    const provider = {
      name: name,
      contact: contact,
      email: email,
      phone:phone,
      rfc: rfc,
      pc: pc,
      street: street,
      number: number,
      ext_number: ext_number,
      colony: colony
    }
    return this.http.post(`${this.uri}/providers/update/${id}`, provider,{headers: header});
  }

  deleteProvider(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/providers/delete/${id}`,{headers: header});
  }

}
