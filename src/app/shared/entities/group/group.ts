import { formatDate } from '@angular/common';

export class Group {
  id: number;
  name: string;
  description: string;
  profilePicture: string;

  constructor(advanceTable) {
    {
      this.id = advanceTable.id || this.getRandomID();
      this.name = advanceTable.name || '';
      this.description = advanceTable.description || '';
      this.profilePicture = advanceTable.profilePicture || 'assets/images/user/group.png';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
