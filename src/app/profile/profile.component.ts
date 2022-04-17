import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
('');
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(private _userService: UsersService, private _fb: FormBuilder) {}
  currentUser: any;
  userData: any;
  editUserDetailsForm: FormGroup;

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser) {
      this.currentUser = JSON.parse(this.currentUser);
    }
    this.getUserDetails();
    this.initForm();
  }

  getUserDetails(): void {
    this._userService.getUserDetailsByEmail(this.currentUser.email).subscribe(
      (res) => {
        this.userData = res.result;
        this.bindFormData(this.userData);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  initForm(): void {
    this.editUserDetailsForm = this._fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
      address: ['', [Validators.required]],
      city: ['', Validators.required],
      country: ['', Validators.required],
      mobile_no: [
        '',
        [Validators.required, Validators.pattern('^[+0]{0,2}(91)?[0-9]{10}$')],
      ],
    });
  }

  bindFormData(userDetails: any): void {
    this.editUserDetailsForm.patchValue({
      name: userDetails.name,
      address: userDetails.address,
      city: userDetails.city,
      country: userDetails.country,
      mobile_no: userDetails.mobile_no,
    });
  }

  onSubmit(): void {
    this._userService
      .editUserDetails(
        this.editUserDetailsForm.value,
        this.currentUser.email
      )
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {}
      );
  }
}
