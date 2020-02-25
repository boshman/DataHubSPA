export interface DataHubFile {
  agencyID: number;
  path: string;
  uploadedBy: string;
  uploadedDate: Date;
  published: boolean;
  objectType: string;
  displayName: string;
}
