import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DebuglinkService } from '../service/debuglink.service';

@Component({
  selector: 'app-sign',
  standalone: true,
  imports: [MatIconModule, CommonModule, ReactiveFormsModule],
  templateUrl: './sign.component.html',
  styleUrl: './sign.component.css'
})
export class SignComponent {
  imageUrl: string | ArrayBuffer | null = null;
  usernamePasswordForm: FormGroup;
  showPassword = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private service: DebuglinkService) {
    this.usernamePasswordForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],

      password: ['', Validators.required],
      confirm: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.usernamePasswordForm.valid) {
      // Faites quelque chose avec les données du formulaire

      console.log(this.usernamePasswordForm.value);
    } else {
      // Gérer les cas d'erreur ou les champs non valides
      console.log("Le formulaire n'est pas valide.");
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }
  }


  signIn() {
    this.service.onSignIn(this.usernamePasswordForm.value).subscribe((res: any) => {
      if (res.success) {
        localStorage.setItem('token', res.value);
        console.log('token:',localStorage.getItem('token'));
        this.router.navigate(['/main']);
      }
      else {
        alert("erreur")
        alert(res[0]["error"])
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
