import { Injectable } from '@angular/core';
import { AppPreferences } from '@awesome-cordova-plugins/app-preferences';
import { BehaviorSubject } from 'rxjs';
import { YLanguageCode } from 'src/app/shared/enums';
import { ActionStatus } from 'src/app/shared/utils';
import { DeviceService } from 'src/app/shared/utils/services/device/device.service';
import { UserProfilService } from './user-profil.service';


@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService {
  langCode:BehaviorSubject<YLanguageCode>=new BehaviorSubject<YLanguageCode>(YLanguageCode.FR);
  private deviceDict="yabi-dict-preferences";
  private deviceDictLang="yabi-pref-lang";
  private deviceDictMoney="yabi-pref-money";
  private devicePreferences =  AppPreferences;
  constructor(
    private deviceService:DeviceService
  ) { }
  
  //set preference to objet and emmit to app
  private setPreferences(langCode:YLanguageCode)
  {
    this.langCode.next(langCode);
  }

  //donwload previous user preferences from firebase
  downloadPreferences()
  {
  }

  //read all preferences from default value of device
  initPreference()
  {
    let lang:YLanguageCode;
    return new Promise<ActionStatus<void>>((resolve,reject)=>{
      this.readDefaultLangFromDevice()
      .then((result)=>{
        lang=result.result;
      })
      .then((result)=>{
        this.setPreferences(lang)
        return this.setPreferencesToDevice(lang)
      })
      .then((result)=>this.updatePreferences(this.langCode.getValue()))
      // .then((result)=> resolve(result))
      .catch((error)=>reject(error))    
    })
  }

  //set all prefrence to preference device object and update firebase
  updatePreferences(langCode:YLanguageCode)
  {
  }

  //set lang to preference device object and update firebase
  updateLang(langCode:YLanguageCode)
  {
  }

  //set 
  private setLangToDevice(langCode:YLanguageCode)
  {
    return new Promise<ActionStatus<void>>((resolve,reject)=>{
      this.devicePreferences.store(this.deviceDict,this.deviceDictLang,langCode)
      .then((result)=>{
        // console.log("langCode ",this.deviceDict,this.deviceDictLang,langCode)
        resolve(new ActionStatus())
      })
      .catch((error)=>{
        // console.error("Error",error)
        reject(new ActionStatus())
      })
    })
    
  }


  setPreferencesToDevice(langCode:YLanguageCode)
  {
    return this.setLangToDevice(langCode);
  }


  readDefaultLangFromDevice():Promise<ActionStatus<YLanguageCode>>
  {
    return this.deviceService.getLanguageCode()
  }


}
