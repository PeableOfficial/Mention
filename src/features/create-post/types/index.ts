export interface Post {
  id: string;
}

export interface IChosenImages {
  width: any;
  height: any;
  url: string | ArrayBuffer | null;
  id: number;
  file: File;
}
