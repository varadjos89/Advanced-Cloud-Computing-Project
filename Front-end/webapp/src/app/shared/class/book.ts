export class Book {

    id:String;
    title:String;
    author:String;
    quantity:String;
    borrow:boolean=false;

    constructor(title:String, author:String, quantity:String){
        this.title=title;
        this.author=author;
        this.quantity=quantity
    }
    
    public data:any;

    setBook(data:any){
        this.data = data;
        let dataModel = {
            "id":data.id,
            "title":data.title,
            "author":data.author,
            "quantity":data.cover,
        }
        return dataModel;
    }
}
