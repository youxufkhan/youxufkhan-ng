import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleSkillCategory } from '../app';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
  imports: [CommonModule],
  standalone: true
})
export class SkillsComponent {
  @Input() skills: SimpleSkillCategory[] = [];

  // Fallback skills data when API doesn't return any skills
  private fallbackSkills: SimpleSkillCategory[] = [
    {
      type: 'Programming',
      skills: ['JavaScript', 'TypeScript', 'PHP', 'Go']
    },
    {
      type: 'Frameworks',
      skills: ['Express.js', 'Fastify', 'Nest.js', 'Angular', 'Yii2', 'Laravel', 'Fiber']
    },
    {
      type: 'Database',
      skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis']
    },
    {
      type: 'Message Broker',
      skills: ['AWS SQS', 'RabbitMQ']
    },
    {
      type: 'Testing',
      skills: ['Jest']
    },
    {
      type: 'Monitoring',
      skills: ['Elastic APM']
    },
    {
      type: 'Containerization',
      skills: ['Docker']
    },
    {
      type: 'Cloud',
      skills: ['AWS']
    },
    {
      type: 'CI/CD & Tools',
      skills: ['Git', 'Gitlab CI/CD', 'Github Actions', 'Jira']
    }
  ];

  /**
   * Get skills to display - use API data if available, otherwise use fallback
   */
  get displaySkills(): SimpleSkillCategory[] {
    return this.skills.length > 0 ? this.skills : this.fallbackSkills;
  }
} 