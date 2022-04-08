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

  items: ProductDTO[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public productService: ProductService,
              public loadController: LoadingController,
              ) {
  }

  ionViewDidLoad() {
    let categorie_id = this.navParams.get('categorie_id');
    let loader = this.presentLoading();
    this.productService.findByCategorie(categorie_id)
    .subscribe(response => {
      this.items = response['content'];
      loader.dismiss();
      this.loadImageUrl();
    },
    error => {
      loader.dismiss();
    });
  }

  loadImageUrl(){
    for ( var i=0; i<this.items.length;i++){
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


}
