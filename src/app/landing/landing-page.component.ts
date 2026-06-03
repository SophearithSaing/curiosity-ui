import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthApiService } from '../auth/auth-api.service';

interface LearningPrinciple {
  title: string;
  description: string;
}

interface MasteryPhase {
  title: string;
  status: string;
  progress: number;
  isActive: boolean;
}

interface CurriculumPath {
  code: string;
  title: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  private readonly authApi = inject(AuthApiService);
  private readonly router = inject(Router);

  public readonly principles: LearningPrinciple[] = [
    {
      title: 'Algorithmic Spacing',
      description: 'Dynamic intervals based on individual retention curves.',
    },
    {
      title: 'Active Recall Friction',
      description:
        'Forced synthesis of concepts without source material visibility.',
    },
  ];

  public readonly phases: MasteryPhase[] = [
    {
      title: 'Phase 01: Passive Recognition',
      status: 'Complete',
      progress: 100,
      isActive: false,
    },
    {
      title: 'Phase 02: Active Recall',
      status: '68%',
      progress: 68,
      isActive: true,
    },
    {
      title: 'Phase 03: Architectural Synthesis',
      status: 'Locked',
      progress: 0,
      isActive: false,
    },
  ];

  public readonly curriculumPaths: CurriculumPath[] = [
    {
      code: 'PTH-101',
      title: 'Node.js Internals',
      description:
        'Deconstruct the Event Loop, V8 Engine mechanics, and asynchronous I/O primitives beneath the surface.',
      tags: ['libuv', 'V8', 'Threads'],
    },
    {
      code: 'PTH-204',
      title: 'Distributed Systems',
      description:
        'Master consensus algorithms, vector clocks, partition tolerance, and large-scale data replication strategies.',
      tags: ['Raft', 'Paxos', 'CAP'],
    },
    {
      code: 'PTH-301',
      title: 'Systems Programming with Rust',
      description:
        'Master memory safety and low-level control. Understand ownership, lifetimes, and zero-cost abstractions.',
      tags: ['Ownership', 'Lifetimes', 'Macros'],
    },
  ];

  /**
   * Redirects authenticated visitors to their active learning workspace.
   * @returns {void}
   */
  public ngOnInit(): void {
    if (this.authApi.hasValidAuthToken()) {
      void this.router.navigateByUrl('/home');
    }
  }
}
