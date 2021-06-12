import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChatWebFrontend';
  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
    private readonly router: Router) {
    this.matIconRegistry.addSvgIcon(
      "app_logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/logo.svg")
    );
  }

  public get isAuthenticated(): boolean {
    return Boolean(sessionStorage.getItem('user'));
  }

  public logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
