import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { OrderDTO } from './../../models/order.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {

  order : OrderDTO;

  installments : number[] = [1,2,3,4,5,6,7,8,9,10,11,12];

  formGroup : FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              ) {
              
      this.order = this.navParams.get('order');
      
      this.formGroup = this.formBuilder.group({
        numberInstallments: [1,Validators.required],
        "@type": ["pagamentoComCartao",Validators.required]
      });

  }

  nextPage(){
    this.order.payment = this.formGroup.value;
    this.navCtrl.setRoot('OrderConfirmationPage',{order : this.order});
  }

}
