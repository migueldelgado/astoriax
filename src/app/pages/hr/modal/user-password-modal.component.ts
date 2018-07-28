import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {INgxMyDpOptions} from 'ngx-mydatepicker';

@Component({
  selector: 'ngx-user-password-modal',
  templateUrl: './user-password-modal.component.html',
})
export class UserPasswordModalComponent {


  password = '';

  constructor(private activeModal: NgbActiveModal) {
  }

  closeModal() {
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
}
