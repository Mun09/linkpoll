export interface PollOption {
  text: string;
  votes?: number;
}

export interface Poll {
  id: string;
  title: string;
  options: PollOption[];
  createdAt?: string;
}
