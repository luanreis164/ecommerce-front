import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder : FormBuilder
     ) {

    this.formGroup = this.formBuilder.group({
      name: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(120)]],
      email: ['',[Validators.required,Validators.email]],
      type: ['',[Validators.required]],
      cpfOrCnpj: ['',[Validators.required,Validators.minLength(11),Validators.maxLength(15)]],
      password: ['',[Validators.required]],
      address: ['',[Validators.required]],
      number: ['',[Validators.required]],
      complement: ['',[]],
      neighborhood: ['',[]],
      postalCode: ['',[Validators.required]],
      telephone1: ['',[Validators.required]],
      telephone2: ['',[]],
      telephone3: ['',[]],
      stateId: [null,[Validators.required]],
      cityId: [null,[Validators.required]]
    })

  }

  signupUser() {
    console.log("enviou o form");
  }

}
