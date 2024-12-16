export interface IJob {
    _id?: string;
    title: string;
    category: string;
    location: string;
    description: string;
    salary: string;
    company: {
      name: string;
      description: string;
      contactEmail: string;
      contactPhone: string;
    };
    applicants?: string[];
    createdAt?: Date;
    updatedAt?: Date;
  }