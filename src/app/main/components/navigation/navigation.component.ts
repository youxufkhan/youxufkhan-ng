import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  isProjectsDropdownOpen = false;

  constructor(private router: Router) {}

  /**
   * Toggle projects dropdown visibility
   */
  toggleProjectsDropdown(): void {
    this.isProjectsDropdownOpen = !this.isProjectsDropdownOpen;
  }

  /**
   * Close projects dropdown
   */
  closeProjectsDropdown(): void {
    this.isProjectsDropdownOpen = false;
  }

  /**
   * Scroll to projects section on main page
   */
  scrollToProjects(): void {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
    this.closeProjectsDropdown();
  }

  /**
   * Navigate to projects page
   */
  viewAllProjects(): void {
    this.router.navigate(['/projects']);
    this.closeProjectsDropdown();
  }
} 