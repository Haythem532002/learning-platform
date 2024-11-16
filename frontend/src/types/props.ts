interface Material {
  id: number;
  files: string[];
}
export interface Classroom {
  id: number;
  title: string;
  description: string;
  password: string;
  startTime: Date;
  private: boolean;
  streamId: string;
  active: boolean;
  materials: File[];
}
