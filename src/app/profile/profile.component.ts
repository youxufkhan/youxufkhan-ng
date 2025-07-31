import { Component, Input } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-profile',
  imports: [NavigationComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @Input() title: string = 'BACKEND SOFTWARE ENGINEER';
  @Input() profilePictureUrl: string = '';
  // Component logic can be added here if needed
} 