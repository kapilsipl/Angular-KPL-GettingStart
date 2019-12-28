import { Component, OnInit } from '@angular/core';
import {IProduct} from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styles: ['thead{color:#337AB7;'],
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  pageTitle: string = "Product List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string;
  // listFilter: string = "cart";
  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value:string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: IProduct[];
products: IProduct[] = [];
constructor(private productService: ProductService){
  
  
}
performFilter(filterBy: string): IProduct[]{
  filterBy = filterBy.toLocaleLowerCase();
  return this.products.filter((product: IProduct) => 
    product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
}

toggleImage(): void {
this.showImage = !this.showImage;
}
ngOnInit(): void{
  console.log('hey, kpls. how are you today??');
  this.productService.getProducts().subscribe({
    next: products => {
      this.products = products
      this.filteredProducts = this.products;
    },
    error: err => this.errorMessage = err
  });
  this.filteredProducts = this.products;
}
}