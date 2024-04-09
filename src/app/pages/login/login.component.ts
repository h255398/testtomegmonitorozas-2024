import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription;
  //loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor(private router: Router,  private authService: AuthService,private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
  }

  async login() {
    this.loading = true;

    this.authService.login(this.email.value as string, this.password.value as string).then(cred => {
      console.log(cred);

      this.router.navigateByUrl('/main');
      this._snackBar.open('Sikeres bejelentkezés', 'Ok', {
        duration: 3000,
      });
      this.loading = false;
    }).catch(error => {
      console.error(error);

      this._snackBar.open('Hibás e-mail vagy jelszó!', 'Ok', {
        duration: 3000,
      });
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }

}
