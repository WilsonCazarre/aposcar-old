export interface BaseEntity {
  url: string;
  id: number;
}

export interface User extends BaseEntity {
  username: string;
  email: string;
  dateJoined: string;
  profilePicture?: string;
  bets: number[];
  score: number;
}

export interface Category extends BaseEntity {
  name: string;
  urlField: string;
  indications: string[];
}
