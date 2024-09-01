export interface FileObject {
  name: string;
  [key: string]: any;
}

export interface SignedUrlData {
  signedUrl: string;
}

export interface SignedUrlResponse {
  data: SignedUrlData | null;
  error: Error | null;
}

export interface ListResponse {
  data: FileObject[] | null;
  error: Error | null;
}

export interface FileWithSignedUrl {
  id: number;
  name: string;
  signedUrl: string;
}