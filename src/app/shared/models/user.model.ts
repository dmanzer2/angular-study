export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
}

export interface UpdateUserRequest extends CreateUserRequest {
  id: number;
}
