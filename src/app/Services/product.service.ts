import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }
  authToken: any;

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getUnits(){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/units`,{headers: header});
  }

  addUnit(name){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    const unit = {
      name: name
    }
    return this.http.post(`${this.uri}/units/add`, unit,{headers: header});
  }

  deleteUnit(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/units/delete/${id}`,{headers: header});
  }


  getProducts(){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/products`,{headers: header});
  }

  addProduct(name,unit,category, description){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    const product = {
      name: name,
      unity: unit,
      category: category,
      description: description
    }
    return this.http.post(`${this.uri}/products/add`, product,{headers: header});
  }

  getProductById(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/products/${id}`,{headers: header});
  }


  updateProduct(id,name,unit,category, description){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    const product = {
      name: name,
      unity: unit,
      category: category,
      description: description
    }
    return this.http.post(`${this.uri}/products/update/${id}`, product,{headers: header});
  }

  deleteProduct(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/products/delete/${id}`,{headers: header});
  }
}
