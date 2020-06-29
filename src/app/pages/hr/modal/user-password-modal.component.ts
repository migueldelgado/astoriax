import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../@core/data/user.service';

@Component({
  selector: 'ngx-user-password-modal',
  templateUrl: './user-password-modal.component.html',
})
export class UserPasswordModalComponent {


  password = '';
  private id = null;

  constructor(private activeModal: NgbActiveModal, private userService: UserService) {
  }

  closeModal() {
    this.id = null;
    this.activeModal.close();
  }


  onClickGeneratePassword() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.password = text;
  }

  setUser(userId) {
    this.id = userId
  }

  updatePassword(form: NgForm) {
    if (form.invalid) {
      alert('Debe ingresar contraseña.');
      return;
    }
    const user = {
      password: this.password,
      id: this.id,
    };

    this.userService.update(user).subscribe(result => {
      alert('Contraseña actualizada');
      this.activeModal.close();
    });
  }
}
