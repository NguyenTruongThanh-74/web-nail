import { Injectable } from '@angular/core';
import { UiToastComponent } from '../../components/ui-toast/ui-toast.component';
import { UiToast } from '../../models/interface/uiInterface';
import { BehaviorSubject } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

export class UiToastService {

  private placementSubject = new BehaviorSubject<string>('top-right');
  placement$ = this.placementSubject.asObservable();

  constructor(private toaster: MessageService){

  }

  showSuccess(message){
    this.showToast({ message: message, type: 'success', icon: 'pi pi-check', delay: 4000 });
  }

  showError(message){
    this.showToast({ message: message, type: 'error', icon: 'pi pi-ban', delay: 4000 });
  }

  showToast(toast: UiToast) {
    if (!this.toaster) {
      console.error('Toaster component is not initialized.');
      return;
    }
    const {
      message,
      title,
      type = 'info',
      placement = 'top-right',
      icon = 'pi pi-info-circle',
      delay = 5000,
      autoHide = true,
      closable = true,
    } = toast;
    console.log(toast);
    this.toaster.add({
      severity: type,
      summary: title,
      detail: message,
      life: delay,
      closable: closable,
      sticky: !autoHide,
      icon: icon,
    });
  }

  clear() {
    if (!this.toaster) {
      console.error('Toaster component is not initialized.');
      return;
    }

    this.toaster.clear();
  }
}
