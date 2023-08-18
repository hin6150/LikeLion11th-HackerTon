import { ReactNode } from 'react';

export interface ContainerType {
  children: ReactNode;
}

export type AgeCategoryType = 'youth' | 'adult' | 'oldMan' | 'NULL';

export type ViedoCategoryType =
  | 'lifeKnowledge'
  | 'Leisure'
  | 'GovernmentSupportInformation'
  | 'Electronics'
  | 'asset';

export interface VideoStateType {
  videoState: 'standBy' | 'accept' | 'refuse';
}

export interface DataType {
  videoId: number;
  ageCategory: AgeCategoryType;
  category: ViedoCategoryType;
  videoDetail: string;
  videoFileName: string;
  videoState: VideoStateType;
  videoTitle: string;
  nickname: string;
  memberId: number;
  hashTag: [{ hashTag: string }];
}
