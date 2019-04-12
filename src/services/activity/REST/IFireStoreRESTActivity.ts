export interface IFireStoreActivity {
  createTime?: string;
  fields: {
    date: {
      timestampValue: string;
    };
    duration: {
      integerValue: string;
    };
    name: {
      stringValue: string;
    };
  };
  name?: string;
  updateTime?: string;
}
