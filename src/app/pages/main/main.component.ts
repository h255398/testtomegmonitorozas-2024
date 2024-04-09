import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {take} from "rxjs";
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{


  constructor(private afAuth: AngularFireAuth,private userservice: UserService) {}
  user?: firebase.default.User | null;
  profil?: User;
  kg: any;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userservice.getById(this.user?.uid) // hiba volt itt: this.user.uid
      .pipe(take(1))
      .subscribe((data) => {
        console.log(data);
        this.profil = data;
        this.kg = data?.kg;
      });
  }

  getWeightData(): string {
    if(this.profil?.kg.length === 1)
    {
        return `${this.profil.kg.pop()} kg`;
    }
    console.log(this.profil?.kg)
    
    const tempArray:string[]=[...this.profil?.kg.reverse() as string[]]
    const delta = +tempArray[0] - +tempArray[1];
    console.log(tempArray[0])
    console.log(tempArray[1])
    
    return delta>0?`${delta} kg-t hízott`:delta<0?`${delta} kg-t fogyott`:`${delta} kg a jelenlegi súlyod`
  }
}
