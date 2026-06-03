import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthApiService } from '../auth/auth-api.service';
import { TopicsApiService } from '../topics/topics-api.service';
import {
  TopicCatalogResponse,
  TopicCategoryResponse,
  TopicResponse,
} from '../topics/topics.models';

interface NavigationItem {
  label: string;
  icon: string;
  isActive: boolean;
}

interface ActiveTopic {
  title: string;
  description: string;
  badgeLabel: string;
  module: string;
  progress: number;
  icon: string;
}

interface TopicCard {
  title: string;
  description: string;
  badgeLabel: string;
  icon: string;
  slug: string;
}

interface TopicGroup {
  title: string;
  topics: TopicCard[];
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  public readonly navigationItems: NavigationItem[] = [
    { label: 'Dashboard', icon: 'dashboard', isActive: true },
    { label: 'Curriculum', icon: 'menu_book', isActive: false },
    { label: 'Playground', icon: 'terminal', isActive: false },
    { label: 'Resources', icon: 'auto_stories', isActive: false },
  ];

  public readonly activeTopic: ActiveTopic = {
    title: 'Node.js Internals',
    description:
      'Understanding the Event Loop, libuv, and asynchronous non-blocking I/O.',
    badgeLabel: 'Backend • Advanced',
    module: 'Module 4: V8 Engine',
    progress: 45,
    icon: 'dns',
  };

  public readonly topicGroups = signal<TopicGroup[]>([]);
  public readonly isLoadingTopics = signal(false);
  public readonly topicLoadError = signal('');

  private readonly authApi = inject(AuthApiService);
  private readonly router = inject(Router);
  private readonly topicsApi = inject(TopicsApiService);

  /**
   * Redirects unauthenticated visitors away and loads the topic catalog.
   * @returns {void}
   */
  public ngOnInit(): void {
    if (!this.authApi.hasValidAuthToken()) {
      void this.router.navigateByUrl('/login');
      return;
    }

    this.loadTopicCatalog();
  }

  /**
   * Removes local authentication state and returns to the public landing page.
   * @returns {void}
   */
  public signOut(): void {
    this.authApi.clearAuthToken();
    void this.router.navigateByUrl('/');
  }

  /**
   * Fetches topic and category data from the backend catalog endpoints.
   * @returns {void}
   */
  private loadTopicCatalog(): void {
    this.isLoadingTopics.set(true);
    this.topicLoadError.set('');

    this.topicsApi.getCatalog().subscribe({
      next: (catalog: TopicCatalogResponse): void => {
        this.topicGroups.set(this.toTopicGroups(catalog));
        this.isLoadingTopics.set(false);
      },
      error: (): void => {
        this.topicLoadError.set(
          'Topics are unavailable. Check the API connection and try again.',
        );
        this.isLoadingTopics.set(false);
      },
    });
  }

  /**
   * Converts backend topic and category documents into dashboard groups.
   * @param {TopicCatalogResponse} catalog - Backend topic catalog response.
   * @returns {TopicGroup[]}
   */
  private toTopicGroups(catalog: TopicCatalogResponse): TopicGroup[] {
    return catalog.categories
      .map((category: TopicCategoryResponse): TopicGroup => {
        const topics = catalog.topics
          .filter((topic: TopicResponse): boolean => {
            return this.getCategoryId(topic.category) === category._id;
          })
          .map((topic: TopicResponse): TopicCard => this.toTopicCard(topic));

        return { title: category.title, topics };
      })
      .filter((group: TopicGroup): boolean => group.topics.length > 0);
  }

  /**
   * Resolves the category ID from a populated or unpopulated topic category.
   * @param {string | TopicCategoryResponse} category - Topic category value.
   * @returns {string}
   */
  private getCategoryId(category: string | TopicCategoryResponse): string {
    if (typeof category === 'string') {
      return category;
    }

    return category._id;
  }

  /**
   * Converts a backend topic document into a dashboard topic card.
   * @param {TopicResponse} topic - Backend topic document to display.
   * @returns {TopicCard}
   */
  private toTopicCard(topic: TopicResponse): TopicCard {
    return {
      title: topic.title,
      description: topic.description,
      badgeLabel: this.getBadgeLabel(topic),
      icon: this.getMaterialIcon(topic.icon),
      slug: topic.slug,
    };
  }

  /**
   * Resolves a stable badge label from topic tags or category data.
   * @param {TopicResponse} topic - Backend topic document to inspect.
   * @returns {string}
   */
  private getBadgeLabel(topic: TopicResponse): string {
    if (topic.tags.length > 0) {
      return topic.tags.join(' • ');
    }

    if (typeof topic.category !== 'string') {
      return topic.category.title;
    }

    return 'Adaptive';
  }

  /**
   * Maps backend icon slugs to valid Material Symbols icon names.
   * @param {string} icon - Backend icon slug or Material Symbol name.
   * @returns {string}
   */
  private getMaterialIcon(icon: string): string {
    const iconMap: Record<string, string> = {
      'memory-management': 'memory',
      concurrency: 'sync_alt',
      'computer-networking': 'lan',
      'node-js': 'dns',
      nodejs: 'dns',
      go: 'data_object',
      'hyperledger-fabric': 'account_tree',
      containerization: 'deployed_code',
      docker: 'deployed_code',
      'ci-cd-pipelines': 'account_tree',
      kubernetes: 'hub',
      'rust-fundamentals': 'code_blocks',
      'go-concurrency': 'data_object',
      'distributed-systems': 'hub',
      'graph-theory': 'account_tree',
      networking: 'lan',
      database: 'database',
    };

    return iconMap[icon] ?? 'memory';
  }
}
