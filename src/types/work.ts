export type WorkScene = 'dashboard' | 'wizard' | 'coffee' | 'colorimeter';

export type Work = {
  name: string;
  at: string;
  atURL: string;
  title: string;
  date: string;
  description: string;
  activities: string[];
  scene: WorkScene;
};
