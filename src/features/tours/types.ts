export interface Tour {
  startLocation: StartLocation;
  ratingsAverage: number;
  ratingsQuantity: number;
  images: string[];
  startDates: string[];
  secretTour: boolean;
  guides: Guide[];
  _id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  locations: Location[];
  slug: string;
  durationWeeks: number;
  reviews: any;
  id: string;
}

export interface StartLocation {
  type: string;
  coordinates: number[];
  description: string;
  address: string;
}

export interface Guide {
  role: string;
  _id: string;
  name: string;
  email: string;
  photo: string;
}

export interface Location {
  type: string;
  coordinates: number[];
  _id: string;
  description: string;
  day: number;
}
