import { Component, OnInit } from '@angular/core';

import {ApiService} from '../shared/services/api.service';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { Modal } from '../shared/class/modal';

@Component({
  selector: 'app-products',
  template:`
  <!-- breadcrumb -->
  <app-header></app-header>
  <app-breadcrumb [pageName]="page"></app-breadcrumb>
  <!-- breadcrumb -->
  <!-- .container -->
  <div class="container">
    <!-- .row -->
    <div class="row ecom-home-catalog-serach-row">
      <!-- .col-lg-4 -->
      <div class="col-lg-4 col-lg-offset-8">
        <!-- .input-group -->
        <div class="input-group mb-3">    
          <input type="search" class="form-control" [(ngModel)]="queryString" placeholder ="Search Book ">          
          <!-- .input-group-append -->
          <div class="input-group-append">
            <span class="input-group-text">
              <i class="material-icons">search</i>
            </span>
          </div>
          <!-- /.input-group-append -->
        </div>
        <!-- /.input-group -->
      </div>
      <!-- /.col-lg-4 -->
    </div>
    <!-- /.row -->
    <!-- .ecom-home-catalog-row -->
    <div class="row ecom-home-catalog-row">
      <!-- .col-lg-4-->
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-6" *ngFor="let book of  books | filterdata: queryString : 'title'; let i = index">
        <!-- .ecom-home-catalog-card -->
        <div class="card ecom-home-catalog-card">
          <figure>
            <img class="card-img-top" src="https://upload.wikimedia.org/wikipedia/en/d/dc/A_Song_of_Ice_and_Fire_book_collection_box_set_cover.jpg" alt="{{book.title}}">
            <figcaption>
              <!--<button type="button" class="btn" id="{{i}}" (click)="openModal(i);">
                Lire plus 
              </button>-->
            </figcaption>
          </figure>
          <!-- .card-body -->
          <div class="card-body">
            <h5 class="card-title ecom-home-catalog-book-title">{{book.title}}</h5>
            <p class="card-text ecom-home-catalog-book-price">
            <span>{{book.quantity}}</span>
            <!--<span>&#36;</span>-->
            </p>
            <a class="btn btn-primary ecom-home-catalog-add-cart" id="{{i}}" (click)="addToCart(i);">
              <span class="ecom-responsive" (click)="removeBook(book.id,i)">Remove Book</span>
              <span class="ecom-home-add-to-cart-icon">
                <i class="material-icons">add_shopping_cart</i>
              </span>
            </a><!-- todo a verifier -->
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.col-lg-4-->
      </div>
      <!-- .ecom-home-catalog-card -->
    </div>
    <!-- .ecom-home-catalog-row -->
  </div>
  <!-- /.container -->
  <!-- .ecom-modal-container -->
  <div class="ecom-modal-container" *ngIf="modalVisibility">
    <!-- .modal-body -->
    <div class="ecom-modal modal-body" >
      <!-- .row -->
      <div class="row ecom-modal-content"> 
        <!-- app-modal-body -->
        <app-modal [item]="modalItem"></app-modal>
        <!-- app-modal-body -->
        <div class="col-lg-12">
          <div class="modal-footer">
            <button (click)="closeModal();" type="button" class="btn btn-secondary ecom-modal-close">Fermer</button>
          </div>
        </div>
      </div>
      <!-- /.row -->
    </div>
    <!-- /.modal-body -->
  </div>
  <!-- /.ecom-modal-container -->
  `,
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  
  page:string;
  books;
  cart:any[];
  cartLength:number;
  modalVisibility:boolean;
  emittedItem:any[];
  modalItem:object;
  storageName:string;
  
  constructor(
    private _bookService:ApiService, 
    private _localStorageService:LocalStorageService,
  ) {}

  ngOnInit() {
    this.page  = "shop";
    this.cartLength = 0
    this.modalItem = new Object;
    this.cart = [];
    this.storageName = "cartCleared";
    this.getData();
  }

  getData():any{

    this._bookService.getBooks().subscribe(
      data => { return this.books = data},
      err => console.error(err),
      () => console.log('done loading books')
    );

  }

  addToCart(i:number):void{
    
    // var bookToCart = new DataToCart().setData(this.books,i);
    // var cartStatus = this._localStorageService.getLocalstorage(this.books, this.storageName);
    // //Check if cart is cleared
    // if(cartStatus === 1){
    //   this.cart = [];
    //   this._localStorageService.setLocalstorage(0, this.storageName);
    //   this.cart.push(bookToCart);
    // }else{
    //   this.cart = this.cart;
    //   this.cart.push(bookToCart);
    // }
    // this.passData(this.cart);

  }

  removeBook(id: string, i:number):void{
    console.log(id);
    this.books.splice(i,1);
    this._bookService.deleteBook(id);
  }

  passData(cart:any[]):void{
    // this.cart = cart;
    // this._dataShareService.sendData(this.cart);
  }

  openModal(i:number):void{

    let array:Modal = new Modal().setItem(this.books,i);
    this.modalItem = array;
    this.modalVisibility = true;
    
  }
  
  closeModal():void{

    this.modalItem = {};
    this.modalVisibility = false;
    
  }
   
}
