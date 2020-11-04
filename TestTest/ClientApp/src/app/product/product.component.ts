import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';
import { Product } from './product';
import { UserService } from 'src/app/user/user.service';
//import { AuthorizeService } from 'src/api-authorization/authorize.service';
//import { SignInComponent } from 'src/app/sign-in/sign-in.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  dataSaved = false;
  productForm: any;
  allProducts: Observable<Product[]>;
  productIdUpdate = null;
  message = null;
  public isAuthenticated: Observable<boolean>;
  //public isAuthenticated: Observable<boolean>;

  constructor(private formbulider: FormBuilder, private productService: ProductService, private userService: UserService) { }

  ngOnInit() {
    this.isAuthenticated = this.userService.isAuthenticated();
    //this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.productForm = this.formbulider.group({
      //ProductId: ['', [Validators.required]],
      ProductName: ['', [Validators.required]],
      ProductType: ['', [Validators.required]],
      ProductPrice: ['', [Validators.required]],
    });
    this.loadAllProducts();
  }
  loadAllProducts() {
    this.allProducts = this.productService.getAll();
  }
  onFormSubmit() {
    this.dataSaved = false;
    const product = this.productForm.value;
    this.CreateProduct(product);
    this.productForm.reset();
  }
  loadProductToEdit(ProductId: number) {
    this.productService.getProductById(ProductId).subscribe(product => {
      this.message = null;
      this.dataSaved = false;
      this.productIdUpdate = product.ProductId;
      //this.productForm.controls['ProductId'].setValue(product.ProductId);
      this.productForm.controls['ProductName'].setValue(product.ProductName);
      this.productForm.controls['ProductType'].setValue(product.ProductType);
      this.productForm.controls['ProductPrice'].setValue(product.ProductPrice);
    });

  }
  CreateProduct(product: Product) {
    if (this.productIdUpdate == null) {
      this.productService.createNew(product).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'Record saved Successfully';
          this.loadAllProducts();
          this.productIdUpdate = null;
          this.productForm.reset();
        }
      );
    } else {
      product.ProductId = this.productIdUpdate;
      this.productService.updateProduct(product).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Record Updated Successfully';
        this.loadAllProducts();
        this.productIdUpdate = null;
        this.productForm.reset();
      });
    }
  }
  deleteProduct(ProductId: number) {
    if (confirm("Are you sure you want to delete this ?")) {
      this.productService.deleteProductEntry(ProductId).subscribe(() => {
        this.dataSaved = true;
        this.message = 'Record Deleted Succefully';
        this.loadAllProducts();
        this.productIdUpdate = null;
        this.productForm.reset();

      });
    }
  }
  resetForm() {
    this.productForm.reset();
    this.message = null;
    this.dataSaved = false;
  }
}  
