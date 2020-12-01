import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class ApiService {
  //edit link here on booksRoot object 
  public booksRoot: string = "http://backend:8080";
  public usersApi:string="";  
  public offersApi:string="";  
  public apiRoot:string;
  public dataApi:string;
  
  constructor(private _http:HttpClient) {} 
  //Get Books
  getBooks():Observable<Object> {
    //return this._http.get(this.booksRoot);
     return this._http.get(this.booksRoot+"/book");
  }

  postBooks(t:string, a:string, q:number) {

    this._http.post(this.booksRoot+"/book", 
    {
      "title": t,
      "author": a,
      "quantity": q
    },
    { headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(
      (val) => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });;
  }

  deleteBook(id: string){
    this._http.delete(this.booksRoot+"/book/"+id).subscribe(
      (val) => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
  }

  borrowingBook(id: string){
    this._http.get(this.booksRoot+"/book/"+id).subscribe(
      (val) => {
          console.log("POST call successful value returned in body", 
                      val);
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });

  }

  //Get commercial offers
  getoffers(offersApi):Observable<Object>{
    this.offersApi = offersApi;
    return this._http.get(this.offersApi);
  }
  //Get users
  getUsers(userRoot):Observable<Object>{
    this.usersApi = userRoot;
    return this._http.get(this.usersApi);
  }
  //Get data
  getData(apiRoot):Observable<Object>{
    this.dataApi = apiRoot;
    return this._http.get(this.dataApi);
  }
}
