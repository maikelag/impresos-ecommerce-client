import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "../../../../environments/environment";
import { Observable } from 'rxjs';
import { ProductModel } from '../../models';
import { ProductCreateDto, ProductUpdateDto } from '../../dtos';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private url = environment.serverURL;

    constructor(private http: HttpClient) {
    }

    getAllProducts(): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(`${this.url}/products`);
    }

    getProductsPaginate(limit: number, offset: number): Observable<ProductModel[]> {
        let params = new HttpParams();
        params = params.append("limit", limit.toString());
        params = params.append("offset", offset.toString());
        return this.http.get<ProductModel[]>(`${this.url}/products`, { params });
    }

    getProductById(productId: string): Observable<ProductModel> {
        return this.http.get<ProductModel>(`${this.url}/products/${productId}`);
    }

    getProductsByCategory(categoryId: string): Observable<ProductModel[]> {
        return this.http.get<ProductModel[]>(`${this.url}/products/category/${categoryId}`)
    }

    createProduct(productData: ProductCreateDto): Observable<ProductModel> {
        return this.http.post<ProductModel>(`${this.url}/products`, productData);
    }

    deleteProduct(productId: string): Observable<ProductModel> {
        return this.http.delete<ProductModel>(`${this.url}/products/${productId}`);
    }

    editProduct(productId: string, productData: ProductUpdateDto) {
        return this.http.put<ProductModel>(`${this.url}/products/${productId}`, productData);
    }

    uploadsImagesOfProduct(productId: string, images: FormData): Observable<any> {
        return this.http.post<any>(`${this.url}/products/${productId}/images`, images, { reportProgress: true, observe: 'events' });
    }


}
