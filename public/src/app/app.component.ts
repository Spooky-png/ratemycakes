import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Cake } from './models/cake';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  cakes:Cake[];
  newCake:Cake = new Cake();

  constructor(private _httpService:HttpService){}

  ngOnInit(){
    this.getCakesFromService();
  }

  getCakesFromService(){
    this._httpService.getCakes().subscribe((data:Cake[])=>{
      for (let cake of data){
        cake.newRating = {comment:"",rating:""};
      }
      this.cakes = data;
    })
  }

  createCake(){
    this._httpService.createCake(this.newCake).subscribe(()=>{
      this.getCakesFromService();
    })
    this.newCake = new Cake();
  }
  saveRating(cake){
    this._httpService.saveRating(cake._id, cake.newRating).subscribe(()=>{
      this.getCakesFromService();
    })
  }
  viewCake(cake) {
    this.viewCake = JSON.parse(JSON.stringify(cake));
  }
  deleteCake(id) {
    let observable = this._httpService.deleteCake(id);
    observable.subscribe(data => {
      console.log("successfully deleted cake")
      this.getCakesFromService()
    })
  }
}