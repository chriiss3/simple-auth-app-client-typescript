interface UserTypes {
  email: string;
  password: string;
  name: string;
  refreshToken: string | null;
  sessionActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}

export { UserTypes }