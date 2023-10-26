import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastController } from '@ionic/angular';

const storage = localStorage;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit {


  loginForm !: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  onSubmit() {
    const userAuthDTO = {
      username: this.loginForm.get('username')!.value,
      password: this.loginForm.get('password')!.value
    };
    console.log("Enviando")
    this.authenticationService
    .authenticateUser(userAuthDTO)
    .subscribe((response) => {
      const jwt = response.token;
      if (response) 
      {
      storage.setItem('jwt', jwt);
      this.router.navigate(['/'])
      } else {
        this.presentToast('Credenciales inválidas')
      }
    }, (error) => {
      if (error.status === 403) {
        this.presentToast('Credenciales inválidas');
      } else {
        this.presentToast('Error en la autenticación');
      }
    });
  }

  redirectRegister(){
    this.router.navigate(['/register']);
  }

}
