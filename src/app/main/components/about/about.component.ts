import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  @Input() summary: string = `Senior Software Engineer with over 7 years of experience building robust, scalable, and high-performance
APIs within microservices architectures. Expertise in Node.js frameworks like Express.js and Fastify.
Passionate about crafting efficient backend systems and leading and mentoring teams for successful
project delivery.`;
} 