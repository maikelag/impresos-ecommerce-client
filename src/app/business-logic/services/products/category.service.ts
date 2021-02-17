import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { CategoryModel, ProductModel } from '../../models';
import { CategoryCreateDto } from '../../dtos';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = environment.serverURL;
 
  constructor(private http: HttpClient) {
  }

  getAllCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(`${this.url}/categories`);
  }

  getCategoryById(categoryId: string): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(`${this.url}/categories/${categoryId}`);
  }

  createCategory(categoryData: CategoryCreateDto): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(`${this.url}/categories`, categoryData);
  }

  deleteCategory(categoryId: string): Observable<CategoryModel> {
    return this.http.delete<CategoryModel>(`${this.url}/categories/${categoryId}`);
  }

  updateCategory(categoryId: string, categoryData: CategoryCreateDto): Observable<CategoryModel> {
    return this.http.put<CategoryModel>(`${this.url}/categories/${categoryId}`, categoryData);
  }

  getProductsFromCategory(categoryName: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.url}/products/category/${categoryName}`)
  }
}
