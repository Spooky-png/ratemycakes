import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-cakes',
  templateUrl: './cakes.component.html',
  styleUrls: ['./cakes.component.css']
})
export class CakesComponent implements OnInit{
  cakes:any;
  newCake:any = {"title": "" , "description" : "" , "image" : ""}

  constructor(private _httpService:HttpService){}

  ngOnInit(){
    this.getCakesFromService();
  }

  getCakesFromService(){
    this._httpService.getCakes().subscribe((data:any[])=>{
      for (let cake of data){
        cake.rating = {comment:"",rating:""};
      }
      this.cakes = data;
    })
    let observable = this._httpService.getCakes();
    observable.subscribe(data => {
      console.log("Got our cakes!", data)
      this.cakes = data;
    });
  }

  createCake(){
    this._httpService.createCake(this.newCake).subscribe(()=>{
      this.getCakesFromService();
    })
    this.newCake = {"title": "" , "description" : "" , "image" : ""}
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