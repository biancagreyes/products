import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { User } from 'src/app/user/user';
//import { AuthorizeService } from 'src/api-authorization/authorize.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  dataSaved = false;
  signUpForm: any;
  allUser: Observable<User[]>;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  //productIdUpdate = null;
  message = null;
  //public isAuthenticated: Observable<boolean>;

  constructor(private formbulider: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    //this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.signUpForm = this.formbulider.group({
      //ProductId: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
    //this.loadAllProducts();
  }
  //loadAllProducts() {
  //  this.allProducts = this.productService.getAll();
  //}
  onFormSubmit() {
    this.dataSaved = false;
    const signUp = this.signUpForm.value;
    this.CreateSignUp(signUp);
    this.signUpForm.reset();
  }
  //loadProductToEdit(ProductId: number) {
  //  this.productService.getProductById(ProductId).subscribe(product => {
  //    this.message = null;
  //    this.dataSaved = false;
  //    this.productIdUpdate = product.ProductId;
  //    //this.productForm.controls['ProductId'].setValue(product.ProductId);
  //    this.productForm.controls['ProductName'].setValue(product.ProductName);
  //    this.productForm.controls['ProductType'].setValue(product.ProductType);
  //    this.productForm.controls['ProductPrice'].setValue(product.ProductPrice);
  //  });

  //}
  CreateSignUp(user: User) {
    this.userService.registerUser(user).subscribe(
        () => {
          this.dataSaved = true;
          this.message = 'Sign Up Successful';
          this.signUpForm.reset();
        }
      );
  }
  //deleteProduct(ProductId: number) {
  //  if (confirm("Are you sure you want to delete this ?")) {
  //    this.productService.deleteProductEntry(ProductId).subscribe(() => {
  //      this.dataSaved = true;
  //      this.message = 'Record Deleted Succefully';
  //      this.loadAllProducts();
  //      this.productIdUpdate = null;
  //      this.productForm.reset();

  //    });
  //  }
  //}
  resetForm() {
    this.signUpForm.reset();
    this.message = null;
    this.dataSaved = false;
  }
}  
