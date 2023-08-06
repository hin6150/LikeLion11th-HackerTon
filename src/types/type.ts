import { ReactNode } from 'react';

export interface VideoInfoType {
  title: string;
  author: string;
  view: number;
  uploadDate: Date;
}

export interface ContainerType {
  children: ReactNode;
}
