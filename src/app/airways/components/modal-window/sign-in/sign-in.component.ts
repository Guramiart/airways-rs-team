import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit{
  public signInForm: FormGroup;

  public isSubmitted = false;

  public hide = true;

  constructor(private data:DataService) {}

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/(?=.*\d)(?=.*[@!$#?&-])(?=.*[a-z])(?=.*[A-Z]).{8,}/)]),
      firstName: new FormControl('', [Validators.required]),
      lastName:new FormControl('', [Validators.required]),
      birthDate:new FormControl('', [Validators.required]),
      male:new FormControl('', [Validators.required]),
      mobile:new FormControl('', [Validators.required]),
      citizen:new FormControl('', [Validators.required])
    });
  }

  public submit() {
    this.isSubmitted = true;
   
  }
}
