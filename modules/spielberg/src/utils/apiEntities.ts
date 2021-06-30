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

export interface Nominee extends BaseEntity {
  name: string;
  pictureUrl: string;
  description: string;
}

export interface Indication extends BaseEntity {
  category: string;
  nominated: Nominee;
  year: number;
  isWinner: boolean;
  annotation: string;
}

export interface Room extends BaseEntity {
  name: string;
  owner: string;
  users: string[];
  shareCode: string;
}
