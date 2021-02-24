import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { map } from 'rxjs/operators'
import { UserService, ResponseModel } from '../../business-logic/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myUser: any;

  constructor(private authService: SocialAuthService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.userData$.pipe(
      map(user => {
        if (user instanceof SocialUser) {
          return {
            ...user,
            email: 'test@gmail.com',
          };
        } else {
          return user;
        }
      })
    ).subscribe((data: ResponseModel | SocialUser) => {
      this.myUser = data;
    });

    // this.authService.authState.pipe(
    //   map(user => {
    //     if (user instanceof SocialUser) {
    //       return {
    //         ...user,
    //         email: 'test@gmail.com',
    //       };
    //     } else {
    //       return user;
    //     }
    //   })
    // ).subscribe((user: SocialUser) => {
    //   if(user !== null) {
    //     this.myUser = user;
    //   } else {
    //     return;
    //   }
    // })
  }

  logout() {
    this.userService.logout();
  }

}
