export interface TopicCategoryResponse {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
}

export interface TopicResponse {
  _id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  tags: string[];
  category: string | TopicCategoryResponse;
}

export interface TopicCatalogResponse {
  categories: TopicCategoryResponse[];
  topics: TopicResponse[];
}
