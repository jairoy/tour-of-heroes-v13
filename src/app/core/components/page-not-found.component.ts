import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
  <mat-card>
    <mat-card-title>404 Page Not Found</mat-card-title>

    <mat-card-content> 
      We could'nt find that page! Not even with x-ray vision.angular.
    </mat-card-content>

    <mat-card-actions>
      <button mat-raised-button color="primary" routerLink="/">
        Take Me Home
      </button>
    </mat-card-actions>

  </mat-card>  
  `,
  styles: [
    `
    :host {
      text-align: center;
    }
    `
    
  ]  
})
export class PageNotFoundComponent {

}