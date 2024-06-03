import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DebuglinkService } from '../service/debuglink.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  imageUrl: string | ArrayBuffer | null = null;
  usernamePasswordForm: FormGroup;
  showPassword = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private service: DebuglinkService) {
    this.usernamePasswordForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      
      password: ['', Validators.required]
    });
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

  onSubmit() {
    if (this.usernamePasswordForm.valid) {
      // Faites quelque chose avec les données du formulaire
      console.log(this.usernamePasswordForm.value);

      
    } else {
      // Gérer les cas d'erreur ou les champs non valides
      alert("Le formulaire n'est pas valide.");
    }
    
  }

  login() {
     
    this.service.onLogin(this.usernamePasswordForm.value).subscribe((res: any) => {
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

  goToSign() {
    this.router.navigate(['/sign']);
    
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
