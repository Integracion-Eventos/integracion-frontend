import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {

  registrationForm!: FormGroup;
  isBuyer: boolean = true;

  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private toastController: ToastController,
    private router: Router) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      isBuyer:[true],
      username: [''],
      firstName: [''],
      lastName: [''],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      name: [''],
      rfc: [''],
      employeeCode: [''],
    });
  }

  onSubmit(){
    const formData = this.registrationForm.value;

    this.authenticationService.checkUsername(formData.username).subscribe((exists) => {
      if (!exists) {
        if (formData.isBuyer){
          const buyerRegistrationDTO = {
            user:{
              username: formData.username,
              email: formData.email,
              password: formData.password
            },
            firstname: formData.firstName,
            lastname: formData.lastName
          };
          this.authenticationService.registerBuyer(buyerRegistrationDTO)
          .subscribe((response) => {
            if(response) {
              this.router.navigate(['/login'])
            }
          })
      } else {
        const organizerRegisterDTO = {
          name: formData.name,
          rfc: formData.rfc,
          employee: {
            firstname: formData.firstName,
            employeeCode: formData.employeeCode,
            lastname: formData.lastName,
            user: {
              username: formData.username,
              email: formData.email,
              password: formData.password
            }
          }
        }
        this.authenticationService.registerOrganizer(organizerRegisterDTO)
        .subscribe((response) => {
          if (response){
            this.router.navigate(['/login'])
          } else {
            this.presentErrorToast("Error registering organizer. Please try again.");
          }
        })
      }
      } else {
        this.presentErrorToast("Usuario ya registrado")
      }
    })


  }
  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

}
