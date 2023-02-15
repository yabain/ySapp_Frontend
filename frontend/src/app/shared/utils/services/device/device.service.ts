import { Injectable } from '@angular/core';
// import { Device, GetLanguageCodeResult } from '@capacitor/device';
import { YLanguageCode } from 'src/app/shared/enums';
import { ActionStatus } from '../../actionstatus';
import { Device } from 'node_modules/@capacitor/core/dist/esm';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(

  ) { }

  getLanguageCode(): Promise<ActionStatus<YLanguageCode>>
  {
    let result = new ActionStatus<YLanguageCode>();
    return new Promise<ActionStatus<YLanguageCode>>((resolve,reject)=>{
      Device.getLanguageCode()
      // .then((value: GetLanguageCodeResult)=>{
      .then((value: any )=>{
        switch(value.value)
        {
          case YLanguageCode.EN:
            result.result=YLanguageCode.EN;
            break;
          default:
            result.result=YLanguageCode.FR;
            break;
        }
        resolve(result);
      })
      .catch((error: any)=>{
        result.apiCode=ActionStatus.UNKNOW_ERROR;
        result.message=error;
        reject(error);
      });
    });
  }

}
