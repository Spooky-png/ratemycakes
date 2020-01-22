import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getCakes() {
    return this._http.get('/cakes')
  }
  getCakeById(id) {
    return this._http.get(`/cakes/${id}`);
  }

  createCake(newCake: any) {
    console.log("in service ", newCake)
    return this._http.post('/new', newCake)
  }
  saveRating(id, rating){
    return this._http.post(`/cakes/${id}/ratings`, rating);
  }
  deleteCake(id) {
    return this._http.delete(`/remove/${id}`)
  }
}