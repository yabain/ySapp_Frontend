import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { NotificationsService } from '../notifications/notifications.service';
import { Group } from '../../entities/group/group';


@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  groupList: Group[] = [];

  constructor(
    private api?: ApiService,
    private notificationsService?: NotificationsService
  ) { }

  getOneGroupToList(contactId: string, contactList) {
  }

  getAllGroups(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.get('groups')
        .subscribe(result => {
          console.log("Get all group: ", result.data);
          let tab: any = result.data;
          for (let i = 0; i < tab.length; i++) {
            tab[i] = this.parseDataFromApi(tab[i]);
          }
          localStorage.setItem("group-list", JSON.stringify(tab));
          resolve(result);
        }, error => {
          reject(error);
        });
    });
  }

  addGroup(group): Promise<any> {
    let groupId = group.groupID;
    group = this.parseDataForApi(group);
    return new Promise((resolve, reject) => {
      this.api.post(`groups`, group)
        .subscribe((response: any) => {
          this.notificationsService.dialogShowCustomPosition('Group added', 'success', 3000);
          resolve(response);
        }, (error: any) => {
          let update = RegExp('\\b'+ 'duplicate key error' +'\\b').test(JSON.stringify(error));
          if (update){
            this.api.put('groups/' + groupId, group)
            .subscribe((data: any) => {
              this.notificationsService.dialogShowCustomPosition('Group updated', 'success', 3000);
              resolve(data);
            }, error => {
              this.notificationsService.showNotification('Can not update group, please try again.', 'danger', 7000);
              reject(error)});
          } else {
          this.notificationsService.showNotification('Can not add group, please try again.', 'danger', 7000);
          console.log('le message', JSON.stringify(error));
          reject(error);}
        });
    })
  }

  deleteGroup(groupId, idGroupToTransfert): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.delete(`groups/${groupId}/${idGroupToTransfert}`)
        .subscribe(response => {
          this.notificationsService.dialogShowCustomPosition('Group delete', 'success', 3000);
          // setTimeout(() => {
          // }, 3000);
          resolve(response);
        }, error => {
          this.notificationsService.showNotification('Can not delete group.', 'danger', 3000);
          setTimeout(() => {
            this.notificationsService.showNotification('This fonction is not ready yet. Please try again later.', 'warning', 5000)
          }, 3000);
          reject(error);
        });
    });
  }

  updateGroup(group): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.put(`groups/${group.id}`, group)
        .subscribe((response: any) => {
          resolve(response);
        }, (error: any) => {
          reject(error);
        });
    })
  }

  parseDataFromApi(groupApiData: Record<string | number, any>): Group {
    let group: Group = new Group(groupApiData);
    group.id = groupApiData._id;
    group.name = groupApiData.name;
    group.description = groupApiData.description;
    group.profilePicture = groupApiData.profilePicture || 'assets/images/user/user.png';
    return group;
  }

  parseDataForApi(groupApiData) {
    console.log('groupApiData: ', groupApiData)
    let group: any = {
      name: groupApiData.name,
      description: groupApiData.description,
      profilePicture: groupApiData.profilePicture,
    }
    console.log('group: ', group)
    return group;
  }

}
