import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../business-logic/services/products/category.service';
import { ProductService } from '../../business-logic/services/products/product.service';


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  categories = [];
  selectedFile: File = null;
  selectedFile2: File = null;

  constructor(private categorieService: CategoryService, private productService: ProductService) { }


  ngOnInit(): void {
    this.allCategories();
  }

  allCategories() {
    return this.categorieService.getAllCategories().subscribe(categories => {
      this.categories = categories;
      console.log(categories);
    })
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0]
  }
  onFileSelected2(event) {
    this.selectedFile2 = <File>event.target.files[0]
  }

  onUpload() {
    const fd: FormData = new FormData();
    fd.append('image', this.selectedFile);
    fd.append('image', this.selectedFile2);
    this.productService.uploadsImagesOfProduct('0f9671ee-17ec-4f50-a9d0-15d20a805cfd', fd).subscribe(res => {
      console.log(res);
    })
  }

}
