import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {ApiService} from '../../shared/services/api.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Book } from '../../shared/class/book';

@Component({
  selector: 'app-contact-form',
  template: `
  <form novalidate [formGroup]="contactForm" (ngSubmit)="onSubmit()" >
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputTitle">Title</label>
      <input type="text" class="form-control" name="inputTitle" formControlName="title" placeholder="Book Name" required>
    </div>
    <div class="form-group col-md-6">
      <label for="inputAuthor">Author</label>
      <input type="text" class="form-control" name="inputAuthor" formControlName="author" placeholder="Author Name" required>
    </div>
    <div class="form-group col-md-6">
      <label for="inputQuantity">Qunatity</label>
      <input type="text" class="form-control" name="inputQuantity" formControlName="quantity" placeholder="Quantity" required>
    </div>
    </div>
    <button type="submit" class="btn btn-primary">Add</button>
    
  </form>
  `,
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  contactFormArray: any;
  storedData: any;
  arrayName: string = "contactFormArray";
  newBook: Book;

  constructor(private _profilService: LocalStorageService,
              private _bookService:ApiService,) { }

  ngOnInit() {

  }

  contactForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    quantity: new FormControl('')
  });

  onSubmit(): void {
    // let formObj = this.contactForm.getRawValue(); 
    // let serializedForm = JSON.stringify(formObj);
    // console.log(serializedForm);
    // output:JSON= <JSON> <unknown>serializedForm;
    console.log(this.contactForm.value.title);

    let title:string =this.contactForm.value.title;
    let author:string =this.contactForm.value.author;
    let quantity:number =this.contactForm.value.quantity;
    //this.newBook= new Book(this.contactForm.value.title, this.contactForm.value.author,this.contactForm.value.quantity);
    this._bookService.postBooks(title,author,quantity);

  }

  getContactData(storedData: any, arrayName: string): any {
    this.storedData = storedData;
    this.arrayName = arrayName;
    this.storedData = this._profilService.getLocalstorage(this.storedData, this.arrayName);
    if (this.storedData === null) {
      this.storedData = [];
    }
    return this.storedData;
  }
}