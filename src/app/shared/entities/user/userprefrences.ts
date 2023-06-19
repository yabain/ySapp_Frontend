import { YLanguageCode, YMoneyCode } from "../../enums";
import { YEntity } from "../yentity";

export class UserPreferences extends YEntity
{
    lang:YLanguageCode=YLanguageCode.FR;
    moneyCode:YMoneyCode=YMoneyCode.XAF
}