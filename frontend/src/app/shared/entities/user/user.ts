import { YEntity } from "../yentity";

export class User extends YEntity
{
    _id!: string;
    status: string;
    email!: string;
    password!: string;
    firstName!: string;
    lastName!: string;
    imageUrl!: string;
    gender!: string;
    phone!: string;
    country!: string;
    region!: string;
    city!: string;
    adress!: string;
    description!: string;
    Organisation!: string;
    poste!: string;
    birthDay!: string;
    dateCreation!: string;
    token: string;
}

