import { Contacto } from './../../clases/contacto';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  contactoNuevo: Contacto = new Contacto();
  contactos = [];

  constructor(public navCtrl: NavController, private callNumber: CallNumber) {

  }

  ngOnInit() {

  }

  guardar() {
    if(this.contactoNuevo.id == 0){
      this.contactoNuevo.id = this.contactos.length + 1;
      this.contactos.push(this.contactoNuevo);
      this.contactoNuevo = new Contacto();
    } else {
      this.contactos.forEach(element => {
        if(element.id !== this.contactoNuevo.id) {
          element = this.contactoNuevo;
        }
      });
      this.contactoNuevo = new Contacto();
    }
  }

  borrar(contacto: Contacto) {
    let nuevosContactos = [];
    this.contactos.forEach(element => {
      if(element !== contacto) {
        nuevosContactos.push(element);
      }
    });
    this.contactos = nuevosContactos;
  }

  editar(contacto: Contacto) {
    this.contactoNuevo = contacto;
  }

  llamar(contacto: Contacto) {
    this.callNumber.callNumber(contacto.telefono, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
}
