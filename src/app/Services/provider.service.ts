import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  uri = 'http://localhost:4000'
  authToken: any;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  loadToken(){
    const token = this.cookieService.get('id_token');
    this.authToken = token;
  }

  getProvider(){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/providers`,{headers: header});
  }

  addProvider(name,contact,phone,email,rfc,pc,street,number,ext_number,colony){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    const provider = {
      name : name,
      contact: contact,
      phone: phone,
      email: email,   
      rfc: rfc,
      pc : pc,
      street : street,
      number: number,
      ext_number: ext_number, 
      colony: colony
    }
    return this.http.post(`${this.uri}/providers/add`, provider,{headers: header});
  }

  getProviderById(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/providers/${id}`,{headers: header});
  }

  updateProvider(id,name,contact,phone,email,rfc,pc,street,number,ext_number,colony){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    const provider = {
      name : name,
      contact: contact,
      phone: phone,
      email: email,   
      rfc: rfc,
      pc : pc,
      street : street,
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
