import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SimpleProject } from '../../services/data-mapping.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  @Input() projects: SimpleProject[] = [];

  // Fallback projects data when API doesn't return any projects
  private fallbackProjects: SimpleProject[] = [
    {
      title: 'E-Commerce Platform',
      domain: 'E-Commerce',
      description: 'A full-stack e-commerce platform with real-time inventory management, payment processing, and admin dashboard.',
      contribution: 'Led backend development using Node.js and Express.js, implemented RESTful APIs, designed database schema, and integrated payment gateways.',
      technologies: ['Node.js', 'Express.js', 'MongoDB', 'Redis', 'Stripe API'],
      imageUrl: 'assets/images/projects/ecommerce.jpg'
    },
    {
      title: 'Ride-Sharing Mobile App',
      domain: 'Transportation',
      description: 'A ride-sharing application similar to Uber with real-time tracking, driver-rider matching, and payment integration.',
      contribution: 'Developed backend microservices architecture, implemented real-time location tracking using WebSockets, and built driver-rider matching algorithm.',
      technologies: ['Node.js', 'Fastify', 'PostgreSQL', 'Redis', 'Socket.io', 'Google Maps API'],
      imageUrl: 'assets/images/projects/ridesharing.jpg'
    },
    {
      title: 'Healthcare Management System',
      domain: 'Healthcare',
      description: 'Comprehensive healthcare management system for hospitals with patient records, appointment scheduling, and billing.',
      contribution: 'Architected the system using microservices, implemented secure authentication and authorization, and developed RESTful APIs for all modules.',
      technologies: ['Node.js', 'Express.js', 'PostgreSQL', 'JWT', 'Docker', 'AWS'],
      imageUrl: 'assets/images/projects/healthcare.jpg'
    },
    {
      title: 'Real-time Chat Application',
      domain: 'Communication',
      description: 'A real-time messaging application with group chats, file sharing, and video calling capabilities.',
      contribution: 'Built real-time messaging backend using WebSockets, implemented file upload functionality, and integrated video calling using WebRTC.',
      technologies: ['Node.js', 'Socket.io', 'MongoDB', 'AWS S3', 'WebRTC'],
      imageUrl: 'assets/images/projects/chat.jpg'
    },
    {
      title: 'Financial Analytics Dashboard',
      domain: 'Finance',
      description: 'Interactive dashboard for financial data visualization with real-time market data and portfolio management.',
      contribution: 'Developed data processing pipelines, implemented real-time data streaming, and built RESTful APIs for financial data access.',
      technologies: ['Node.js', 'Express.js', 'PostgreSQL', 'Redis', 'Chart.js', 'WebSocket'],
      imageUrl: 'assets/images/projects/finance.jpg'
    },
    {
      title: 'Learning Management System',
      domain: 'Education',
      description: 'Online learning platform with course management, student progress tracking, and interactive assessments.',
      contribution: 'Designed and implemented the backend architecture, built course management APIs, and integrated video streaming services.',
      technologies: ['Node.js', 'Fastify', 'MongoDB', 'Redis', 'AWS S3', 'FFmpeg'],
      imageUrl: 'assets/images/projects/education.jpg'
    }
  ];

  constructor(private router: Router) {}

  /**
   * Get projects to display - use API data if available, otherwise use fallback
   */
  get displayProjects(): SimpleProject[] {
    return this.projects.length > 0 ? this.projects : this.fallbackProjects;
  }

  /**
   * Get first 3 projects to display
   */
  get currentProjects(): SimpleProject[] {
    return this.displayProjects.slice(0, 3);
  }

  /**
   * Navigate to projects page
   */
  viewAllProjects(): void {
    this.router.navigate(['/projects']);
  }
} 