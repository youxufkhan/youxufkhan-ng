import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTestimonial } from '../../services/data-mapping.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  @Input() testimonials: SimpleTestimonial[] = [];

  // Current page for pagination
  currentPage = 0;
  testimonialsPerPage = 3;

  // Fallback testimonials data when API doesn't return any testimonials
  private fallbackTestimonials: SimpleTestimonial[] = [
    {
      name: 'Eoin Conway',
      title: 'CEO at Canary7',
      url: 'https://www.linkedin.com/in/eoinconway/',
      content: 'Yousuf was a dedicated member the team, worked well under pressure and was prepared to put the extra hours in whenever it was needed,',
      imageUrl: 'public/testimonials/1.jpeg'
    },
    {
      name: 'Muhammad Shaheryar Khalid',
      title: 'SQA at Bykea Technologies',
      url: 'https://www.linkedin.com/in/shaheryarr/',
      content: 'I had the pleasure of working with Muhammad Yousuf at Bykea, where he consistently demonstrated exceptional ownership and commitment to every task. His problem-solving skills and dedication to delivering high-quality solutions made a significant impact on our team\'s success. Yousuf\'s ability to take initiative and collaborate effectively sets him apart as a reliable and skilled engineer. I highly recommend him for any role that values technical expertise, responsibility, and teamwork.',
      imageUrl: 'public/testimonials/2.jpeg'
    },
    {
      name: 'Asad Ullah',
      title: 'DevOps Lead at Qavi Tech',
      url: 'https://www.linkedin.com/in/auasad/',
      content: 'Yousuf was not just a colleague but also a good friend of mine. I worked with many professionals throughout my career but he was a unique one, a man with pristine work ethics. His expertise as a developer is considerable, he is easily adjustable to any given situation.',
      imageUrl: 'public/testimonials/3.jpeg'
    },
    {
      name: 'Hammad Hassan Bajwa',
      title: 'Software Engineer at sMOTIVE GmbH',
      url: 'https://www.linkedin.com/in/h-hassan-sde/',
      content: 'Yousuf is one of the most talented guy I\'ve seen my at my workplace who inspires juniors with his great work ethics. I recommend him 💯.',
      imageUrl: 'public/testimonials/4.jpeg'
    },
    {
      name: 'Neeraj Bhateja',
      title: 'Senior Software Engineer at State Bank of Pakistan',
      url: 'https://www.linkedin.com/in/neerajbatheja/',
      content: 'I have been working with yousuf for past 4 months at Bykea ( Delivery Vertical ) , He is really passionate and technical guy , whether its back-end or front-end he perform well and he helps me a lot throughout these 4 months.',
      imageUrl: 'public/testimonials/5.jpeg'
    },
    {
      name: 'Raza Anis',
      title: 'Senior Software Engineer at Emirates NBD',
      url: 'https://www.linkedin.com/in/raza-anis/',
      content: 'Yousuf is an excellent resource, and a master at JS Fullstack Development has been a real gem to work with. He makes sure all the deadlines meet and that also with the highest standards. He is a hardworking and dedicated person who will complete your project in a given time frame. I would recommend and endorse Yousuf.',
      imageUrl: 'public/testimonials/6.jpeg'
    }
  ];

  /**
   * Get testimonials to display - use API data if available, otherwise use fallback
   */
  get displayTestimonials(): SimpleTestimonial[] {
    return this.testimonials.length > 0 ? this.testimonials : this.fallbackTestimonials;
  }

  /**
   * Get current page testimonials
   */
  get currentTestimonials(): SimpleTestimonial[] {
    const startIndex = this.currentPage * this.testimonialsPerPage;
    return this.displayTestimonials.slice(startIndex, startIndex + this.testimonialsPerPage);
  }

  /**
   * Get total number of pages
   */
  get totalPages(): number {
    return Math.ceil(this.displayTestimonials.length / this.testimonialsPerPage);
  }

  /**
   * Check if previous button should be enabled
   */
  get canGoPrevious(): boolean {
    return this.currentPage > 0;
  }

  /**
   * Check if next button should be enabled
   */
  get canGoNext(): boolean {
    return this.currentPage < this.totalPages - 1;
  }

  /**
   * Go to previous page
   */
  previousPage(): void {
    if (this.canGoPrevious) {
      this.currentPage--;
    }
  }

  /**
   * Go to next page
   */
  nextPage(): void {
    if (this.canGoNext) {
      this.currentPage++;
    }
  }

  /**
   * Get array of page numbers for indicators
   */
  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }
} 