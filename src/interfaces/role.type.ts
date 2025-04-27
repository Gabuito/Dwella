export type Role = {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};