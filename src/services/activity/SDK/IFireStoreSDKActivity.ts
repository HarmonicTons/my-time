export interface IFireStoreSDKActivity {
  date: {
    nanoseconds: number;
    seconds: number;
  };
  duration: number;
  name: string;
}
