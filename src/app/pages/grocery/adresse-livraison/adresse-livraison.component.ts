import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adresse-livraison',
  templateUrl: './adresse-livraison.component.html',
  styleUrls: ['./adresse-livraison.component.scss']
})
export class AdresseLivraisonComponent {
  submitted=false;
  AdressLivraison!: UntypedFormGroup;
  submit=false;

  constructor(private formBuilder: UntypedFormBuilder){}

  ngOnInit():void{
    this.AdressLivraison=this.formBuilder.group({
      Civilite:['', Validators.required],
      Nom:['',[Validators.required,]],
      Prenom:['', Validators.required],
      Ville:['', Validators.required],
      AdressePostale:['', Validators.required],
      ComplementAdresse:[''],
      CodePostale:['', Validators.required],
      NumeroDeTelephone:['', Validators.required],
    })
  }
  get fa() { return this.AdressLivraison.controls; }
}
