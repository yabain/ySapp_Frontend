import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { NotificationsService } from '../notifications/notifications.service';
import { Group } from '../../entities/group/group';


@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  groupList: Group[] = [];
  waitingGroups = false;
  waitingSend = false;

  constructor(
    private api?: ApiService,
    private notificationsService?: NotificationsService
  ) {
    // this.getAllGroups();
  }

  getContactListOfGroup(groupId: string): Promise<any> {
    this.waitingGroups = true;
    this.notificationsService.showNotification('Pending.....', 'info', 3000)
    return new Promise((resolve, reject) => {
      this.api.get(`groups/${groupId}/contacts`)
        .subscribe(result => {
          this.waitingGroups = false;
          console.log(`Get contact of ${groupId} group: `, result.data);
          let tab: any = result.data;
          for (let i = 0; i < tab.length; i++) {
            tab[i] = this.parseDataFromApi(tab[i]);
          }
          localStorage.setItem(`${groupId}`, JSON.stringify(tab));
          resolve(tab);
        }, error => {
          this.waitingGroups = false;
          reject(error);
        });
    });
  }

  getAllGroups(): Promise<any> {
    this.waitingGroups = true;
    this.notificationsService.showNotification('Pending.....', 'info', 3000)
    return new Promise((resolve, reject) => {
      this.api.get('groups')
        .subscribe(result => {
          this.waitingGroups = false;
          console.log("Get all group: ", result.data);
          let tab: any = result.data;
          for (let i = 0; i < tab.length; i++) {
            tab[i] = this.parseDataFromApi(tab[i]);
          }
          localStorage.setItem("groups-list", JSON.stringify(tab));
          resolve(tab);
        }, error => {
          this.waitingGroups = false;
          reject(error);
        });
    });
  }

  addGroup(group): Promise<any> {
    this.waitingGroups = true;
    let groupId = group.groupID;
    group = this.parseDataForApi(group);
    this.notificationsService.showNotification('Pending.....', 'info', 3000)
    return new Promise((resolve, reject) => {
      this.api.post(`groups`, group)
        .subscribe((response: any) => {
          this.waitingGroups = false;
          this.notificationsService.dialogShowCustomPosition('Group added', 'success', 3000);
          resolve(response);
        }, (error: any) => {
          this.waitingGroups = false;
          console.log("Erreur ajout de group", error);
          this.notificationsService.showNotification('Can not add group, please try again.', 'danger', 7000);
          reject(error)
        });
    })
  }

  deleteGroup(groupId, idGroupToTransfert): Promise<any> {
    this.waitingGroups = true;
    this.notificationsService.showNotification('Pending.....', 'info', 3000)
    return new Promise((resolve, reject) => {
      this.api.delete(`groups/${groupId}/${idGroupToTransfert}`)
        .subscribe(response => {
          this.waitingGroups = false;
          this.notificationsService.dialogShowCustomPosition('Group delete', 'success', 3000);
          // setTimeout(() => {
          // }, 3000);
          console.log('Group deleted', response)
          resolve(response);
        }, error => {
          this.waitingGroups = false;
          this.notificationsService.showNotification('Can not delete group.', 'danger', 3000);
          setTimeout(() => {
            this.notificationsService.showNotification('This fonction is not ready yet. Please try again later.', 'warning', 5000)
          }, 3000);
          reject(error);
        });
    });
  }

  removeContactToGroup(contactId: string, groupId: string){
    this.waitingGroups = true;
    this.notificationsService.showNotification('Pending.....', 'info', 3000)
    return new Promise((resolve, reject) => {
      this.api.delete(`groups/delete/${contactId}/${groupId}`)
        .subscribe(response => {
          this.waitingGroups = false;
          this.notificationsService.dialogShowCustomPosition('Group reloved', 'success', 3000);
          // setTimeout(() => {
          // }, 3000);
          console.log('Group removed', response)
          resolve(response);
        }, error => {
          this.waitingGroups = false;
          this.notificationsService.showNotification('Can not remove group.', 'danger', 3000);
          setTimeout(() => {
            this.notificationsService.showNotification('This fonction is not ready yet. Please try again later.', 'warning', 5000)
          }, 3000);
          reject(error);
        });
    });

  }

  addContactToGroup(contactId: string, groupId: string){
    this.waitingGroups = true;
    this.notificationsService.showNotification('Pending.....', 'info', 3000)
    return new Promise((resolve, reject) => {
      this.api.delete(`groups/add/${contactId}/${groupId}`)
        .subscribe(response => {
          this.waitingGroups = false;
          this.notificationsService.dialogShowCustomPosition('Group reloved', 'success', 3000);
          // setTimeout(() => {
          // }, 3000);
          console.log('Group removed', response)
          resolve(response);
        }, error => {
          this.waitingGroups = false;
          this.notificationsService.showNotification('Can not remove group.', 'danger', 3000);
          setTimeout(() => {
            this.notificationsService.showNotification('This fonction is not ready yet. Please try again later.', 'warning', 5000)
          }, 3000);
          reject(error);
        });
    });
  }

  updateGroup(group): Promise<any> {
    this.waitingGroups =  true;
    this.notificationsService.showNotification('Pending.....', 'info', 3000)
    return new Promise((resolve, reject) => {
      this.api.put(`groups/${group.id}`, group)
        .subscribe((response: any) => {
          this.waitingGroups = false;
          this.notificationsService.dialogShowCustomPosition('Group updated', 'success', 3000);
          resolve(response);
        }, (error: any) => {
          this.waitingGroups = false;
          console.log("Erreur update group", error);
          this.notificationsService.showNotification('Can not update group, please try again.', 'danger', 7000);
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

  findGroupById(groupId: string): string{
    let groupList = JSON.parse(localStorage.getItem('groups-list'));
    const index = groupList.findIndex(x => x.id === groupId)
    return groupList[index];
  }
}