export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
};

export type AuthenticateInput = {
  initDataRaw: Scalars["String"]["input"];
};

export type Mutation = {
  __typename?: "Mutation";
  archiveArticle: Scalars["Boolean"]["output"];
  authenticate: Scalars["Boolean"]["output"];
};

export interface RootObject {
  success: boolean;
  response: Response;
}

interface Response {
  user: User;
  token: string;
}

export interface User {
  _id: number;
  __v: number;
  allowsWriteToPm: boolean;
  firstName: string;
  languageCode: string;
  lastName: string;
  username: string;
  photoUrl: string;
  createdAt: string;
  updatedAt: string;
}
