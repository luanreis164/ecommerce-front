import { ProductService } from './../../services/domain/product.service';
import { ProductDTO } from './../../models/product.dto';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  items: ProductDTO[] = [];
  page: number =0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public productService: ProductService,
              public loadController: LoadingController,
              ) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let categorie_id = this.navParams.get('categorie_id');
    let loader = this.presentLoading();
    this.productService.findByCategorie(categorie_id,this.page,10)
    .subscribe(response => {
      let start = this.items.length;
      this.items = this.items.concat(response['content']);
      let end = this.items.length-1; 
      loader.dismiss();
      this.loadImageUrl(start,end);
    },
    error => {
      loader.dismiss();
    });
  }

  loadImageUrl(start:number, end:number){
    for ( var i=start; i<= end;i++){
      let item = this.items[i];
      this.productService.getSmallImageFromBucket(item.id)
      .subscribe(response => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/p${item.id}-small.jpg`;
      },
      error => {});
    }
  }

  showDetail(product_id : string){ 
    this.navCtrl.push('ProductDetailPage',{product_id : product_id});
  }

  presentLoading(){
      let loader = this.loadController.create({
        content:"Aguarde..."
      });
      loader.present();
      return loader;
  }

  doRefresh(refresher){
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    },2000);
  }

  doInfinite(infiniteScroll){
    this.page++;
    this.loadData();
    setTimeout(() => {
         infiniteScroll.complete();  
    },1000);
  }

}
