import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CityDTO } from '../../models/city.dto';
import { StateDTO } from '../../models/state.dto';
import { CityService } from '../../services/domain/city.service';
import { StateService } from '../../services/domain/state.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  states : StateDTO[];
  cities : CityDTO[];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public formBuilder : FormBuilder,
     public cityService : CityService,
     public stateService : StateService,
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

  ionViewDidLoad(){
    this.stateService.findAll()
      .subscribe(response => {
        this.states = response;
        this.formGroup.controls.stateId.setValue(this.states[0].id);
        this.updateCities();
      },
      error => {});
  }


  updateCities(){
      let state_id = this.formGroup.value.stateId;
      this.cityService.findAll(state_id)
      .subscribe(response => {
          this.cities = response;
          this.formGroup.controls.cityId.setValue(null);
      },
      error =>{});
  }


  signupUser() {
    console.log("enviou o form");
  }

}
