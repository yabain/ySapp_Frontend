import { formatDate } from '@angular/common';

export class Message {
  id: any;
  subject: string;
  message: string;

  constructor(advanceTable) {
    {
      this.id = advanceTable.id;
      this.message = ' *' + advanceTable.subject + '*  :      ' + advanceTable.message;
    }
  }
  
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
