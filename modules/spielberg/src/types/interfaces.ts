export interface BaseRequest {
  url: string;
  id: number;
}

export interface BaseError {
  detail: string;
}

export interface Category extends BaseRequest {
  name: string;
  urlField: string;
  indications: string[];
}

export interface Nominee extends BaseRequest {
  name: string;
  pictureUrl: string;
  description: string;
}

export interface Indication extends BaseRequest {
  category: string;
  nominated: Nominee;
  year: number;
  isWinner: boolean;
  annotation: string;
}

export interface User extends BaseRequest {
  username: string;
  email: string;
  dateJoined: string;
  profilePicture?: string;
  bets: number[];
  score: number;
}
