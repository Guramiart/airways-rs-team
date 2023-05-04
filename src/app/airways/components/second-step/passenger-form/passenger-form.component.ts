import { Component, OnInit, Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateValidator } from '../../modal-window/sign-in/validator';
  

@Component({
  selector: 'app-passenger-form',
  templateUrl: './passenger-form.component.html',
  styleUrls: ['./passenger-form.component.scss']
})
export class PassengerFormComponent implements OnInit{
  @Input() isSubmitted : boolean

  public form: FormGroup;

  public gender = 'Male';

  public showMsg = false

  public showMsg2 = false

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]*$/)]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]*$/)]),
      birthDate: new FormControl<string>('', [Validators.required, DateValidator()]),
    });
  }
  
}
