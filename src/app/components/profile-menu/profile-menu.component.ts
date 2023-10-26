import { Component, OnInit } from '@angular/core';
import { OrganizerService } from 'src/app/services/organizer.service';
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
  organizerData : any;

  constructor(private userService: UserService, private organizerService: OrganizerService) { }

  async ngOnInit() {
    this.userData = await this.getUserData();
    console.log(this.userData);
    if (this.userData.role == 'ROLE_BUYER') {
      this.isBuyer = true;
    } else if (this.userData.role == 'ROLE_EMPLOYEE_ADMIN' || this.userData.role == 'ROLE_EMPLOYEE_EVENT') {
      this.isEmployee = true;
      this.organizerData = await this.getOrganizerData(this.userData.data.organizer_id);
      console.log(this.organizerData)
    }
  }

  getUserData(): Promise<any> {
    return this.userService.getUserById().toPromise();
  }

  getOrganizerData(organizerId: String) : Promise<any> {
    return this.organizerService.getOrganizerById(organizerId).toPromise();
  }

  

}
