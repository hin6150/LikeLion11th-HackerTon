import { ReactNode } from 'react';

export interface ContainerType {
  children: ReactNode;
}

export interface AgeCategoryType {
  ageCategory: 'youth' | 'adult' | 'oldMan' | 'NULL';
}

export interface ViedoCategoryType {
  videoCategory:
    | 'lifeKnowledge'
    | 'Leisure'
    | 'GovernmentSupportInformation'
    | 'Electronics'
    | 'asset';
}

export interface VideoStateType {
  videoState: 'standBy' | 'accept' | 'refuse';
}

export interface DataType {
  ageCategory: AgeCategoryType;
  category: ViedoCategoryType;
  hashTag: [{ hashTag: '집' }];
  memberId: number;
  videoDetail: string;
  videoFileName: string;
  videoId: number;
  videoState: VideoStateType;
  videoTitle: string;
  writer: string;
}
