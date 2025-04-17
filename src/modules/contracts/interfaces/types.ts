
export type TInterval =  'weekly' | 'monthly' | 'yearly' | 'biweekly';

export type TStatus = 'active' | 'completed' | 'cancelled' ;

export type TContract = {
  id: number;
  uuid: string;
  tenant: string;
  owner: string;
  property: string;
  startDate: Date;
  endDate: Date;
  value: number;
  status: TStatus;
  createdAt: Date;
  updatedAt: Date;
  interval: TInterval;
};

