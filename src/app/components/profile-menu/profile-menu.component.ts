import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent  implements OnInit {
  isBuyer : any;
  isEmployee : any;
  userData : any;

  constructor(private userService: UserService) { }

  async ngOnInit() {
    this.userData = await this.getUserData();
    console.log(this.userData);
    if (this.userData.role == 'ROLE_BUYER') {
      this.isBuyer = true;
    } else if (this.userData.role == 'ROLE_EMPLOYEE_ADMIN' || this.userData.role == 'ROLE_EMPLOYEE_EVENT') {
      this.isEmployee = true;
    }
  }

  getUserData(): Promise<any> {
    return this.userService.getUserById().toPromise();
  }

  

}
