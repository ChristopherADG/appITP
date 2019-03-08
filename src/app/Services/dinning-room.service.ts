import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DinningRoomService {

  uri = 'http://localhost:4000'
  authToken: any;

  constructor(private http: HttpClient) { }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getDinningRooms(){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/dinningRooms`,{headers: header});
  }

  addDinningRoom(street,chefManager, phone, name, pc,number,ext_number,colony){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    const dinningRoom = {
      chefManager: chefManager,
      phone: phone,
      name: name,
      pc : pc,
      street : street,
      number: number,
      ext_number: ext_number, 
      colony: colony
    }
    return this.http.post(`${this.uri}/dinningRooms/add`, dinningRoom,{headers: header});
  }

  getDinningRoomById(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/dinningRooms/${id}`,{headers: header});
  }

  updateDinningRoom(id, street,chefManager, phone, name, pc,number,ext_number,colony){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    const dinningRoom = {
      chefManager: chefManager,
      phone: phone,
      name: name,   
      pc : pc,
      street : street,
      number: number,
      ext_number: ext_number, 
      colony: colony
    }
    return this.http.post(`${this.uri}/dinningRooms/update/${id}`, dinningRoom,{headers: header});
  }

  deleteDinningRoom(id){
    this.loadToken();
    let header = new HttpHeaders({
      'Authorization': this.authToken
    });
    return this.http.get(`${this.uri}/dinningRooms/delete/${id}`,{headers: header});
  }
}
