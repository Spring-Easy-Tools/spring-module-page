import {inject, Injectable} from '@angular/core';
import {Auth, User, user} from '@angular/fire/auth';
import {distinctUntilChanged} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private auth: Auth = inject(Auth);
  user$ = user(this.auth).pipe(distinctUntilChanged());

  constructor() {
    this.user$.subscribe((user: User | null) => {
      // todo: просто дебаг, потом удалить
      console.log(`Новый Firebase User: ${JSON.stringify(user)}`);
    })
  }

  public async logout() {
    await this.auth.signOut()
  }
}
