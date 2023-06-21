import { formatDate } from '@angular/common';

export class Contact {
  id: number;
  img: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  birthday: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  poste: string;
  organisation: string;
  about: string;
  adress: string;
  region: string;

  constructor(advanceTable) {
    {
      this.id = advanceTable.id || this.getRandomID();
      this.img = advanceTable.avatar || 'assets/images/user/user.png';
      this.firstName = advanceTable.firstName || '';
      this.lastName = advanceTable.lastName || '';
      this.email = advanceTable.email || '';
      this.gender = advanceTable.gender || 'male';
      this.birthday = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.phone = advanceTable.phone || '';
      this.address = advanceTable.address || '';
      this.country = advanceTable.country || '';
      this.poste = advanceTable.poste || '';
      this.organisation = advanceTable.organisation || '';
      this.about = advanceTable.about || '';
      this.city = advanceTable.city || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
