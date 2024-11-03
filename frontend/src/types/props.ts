interface Material {
  id: number;
  files: string[];
}
export interface Classroom {
  title: string;
  description: string;
  password: string;
  startTime: string;
  private: boolean;
  streamId: string;
  active: boolean;
  materials: Material[];
}
