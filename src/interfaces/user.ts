interface IExperience {
  company: string;
  position: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

export interface IUser {
  _id?: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  skills: string[];
  profilePhoto: string;
  country: string;
  languages: string[];
  nationality: string;
  profession: string;
  experience: number;
  experiences: IExperience[];
  createdAt?: Date;
  updatedAt?: Date;
  appliedJobs?: string[];
}
