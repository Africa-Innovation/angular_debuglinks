
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LinkFormComponent } from '../link-form/link-form.component';
import { SidenavComponent } from "../sidenav/sidenav.component";

import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Link } from '../../models/link';
import { DebuglinkService } from '../../service/debuglink.service';

 

@Component({
    selector: 'app-main-page',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule,MatIconModule, LinkFormComponent, SidenavComponent]
})

export class MainPageComponent {

  constructor( private service: DebuglinkService,private router: Router){}
  menuOpen = false;
  searchTerm= '';
  isMenuOpen = false;
  isFormOpen = false;
  links: any[] = [];

  ngOnInit(){
    //recuperer les informations lors de l'initialisation du composant
    this.getLinks();
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  closemenu() {
    this.menuOpen = false;
  }
  openLinkForm() {
    this.isFormOpen = true;
  }

  closeLinkForm() {
    this.isFormOpen = false;
  }

  getLinks(){
    this.service.getAllLinks().subscribe((res: any) => {
      if (res) { 
        this.links=res;
        
       }
      else {
        alert("erreur")
        alert(res[0]["error"])
      }
    }); 
  }

  search( ){
    this.service.searchLinks(this.searchTerm).subscribe((res: any) => {
      if (res) { 
        this.links=res;
        console.log("found")
       }
      else {
        alert("erreur")
        alert(res[0]["error"])
      }
    }); 
  }
  goToAbout() {
    this.router.navigate(['/about']);
  }
  goToProfil() {
    this.router.navigate(['/profil']);
  }
  
}
