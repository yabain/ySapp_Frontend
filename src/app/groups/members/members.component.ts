import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { FormDialogComponent } from '../dialogs/form-dialog/form-dialog.component';
// import { DeleteDialogComponent } from '../dialogs/delete/delete.component';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
// import { FormMessageComponent } from '../dialogs/form-message/form-message.component';
import { NotificationsService } from 'src/app/shared/service/notifications/notifications.service';
import { ContactService } from 'src/app/shared/service/contact/contact.service';
import { Contact } from 'src/app/shared/entities/contact/contact';
import { ContactsService } from 'src/app/shared/service/contact/contacts.service';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { FormDialogComponent } from '../groups-dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from '../groups-dialogs/delete/delete.component';
import { FormMessageComponent } from '../groups-dialogs/form-message/form-message.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupsService } from 'src/app/shared/service/groups/groups.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.sass'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})

export class MembersComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  displayedColumns = [
    'select',
    'img',
    'firstName',
    'lastName',
    'email',
    // 'gender',
    // 'birthday',
    'phone',
    // 'address',
    // 'country',
    'city',
    'actions'
  ];
  exampleDatabase: ContactService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Contact>(true, []);
  id: number;
  contact: Contact | null;
  loadingContacts: boolean = false;
  urlData: any = null;

  breadscrums = [
    {
      title: 'Contacts/',
      items: ['Home'],
      active: 'Contacts'
    }
  ];

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public contactService: ContactService,
    private snackBar: MatSnackBar,
    private contactsService: ContactsService,
    private notificationsService: NotificationsService,
    private activatedRoute: ActivatedRoute,
    private groupsService: GroupsService,
    private router: Router
  ) {
    super();
    
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit() {
    this.scrollToTop();
    this.loadingContacts = true;

    this.urlData = this.router.url.split('groups-grid/');
    console.log('id du groupe: ', this.urlData[1]);
  
    if (!localStorage.getItem(this.urlData[1])) {
      console.log('rien concernant cet id');
      this.refresh(this.urlData[1]);
    } else {
      this.loadData();
      this.loadingContacts = false;
    }
  }
  
  navigateToGroups(){
    this.router.navigateByUrl('/groups');
  }

  refresh(contactId:string) {
    this.loadingContacts = true;
    if (contactId) {
      this.groupsService.getContactListOfGroup(contactId)
        .then((contacts) => {
          this.loadingContacts = false;
          // this.notificationsService.showNotification('Contacts list loaded successfully', 'success');
          // this.showNotification('snackbar-success', 'Contacts list loaded successfully',
          //   'bottom',
          //   'center')
          this.contactService.getAllContacts();
          this.loadData();
        })
        .catch((error) => {
          this.loadingContacts = false;
        })
    } else {
      this.loadingContacts = false;
      return false;
    }

    this.loadingContacts = true;
    this.contactsService.getAllContacts()
      .then((contacts) => {
        this.loadingContacts = false;
        // this.notificationsService.showNotification('Contacts list loaded successfully', 'success');
        // this.showNotification('snackbar-success', 'Contacts list loaded successfully',
        //   'bottom',
        //   'center')
        this.contactService.getAllContacts();
        this.loadData();
      })
      .catch((error) => {
        this.loadingContacts = false;
      })
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  addNew() {
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        contact: this.contact,
        action: 'add'
      },
      direction: tempDirection
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        setTimeout(() => {
          this.refresh(this.urlData[1]);
          this.refreshTable();
        }, 3000);
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase.dataChange.value.unshift(
          this.contactService.getDialogData()
        );
        // this.showNotification(
        //   'snackbar-success',
        //   'Add Record Successfully...!!!',
        //   'bottom',
        //   'center'
        // );
      }
    });
  }

  deleteItem(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: row,
      direction: tempDirection
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        setTimeout(() => {
          this.refresh(this.urlData[1]);
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
            (x) => x.id === this.id
          );
          this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
          this.refreshTable();
        }, 3000);
        // for delete we use splice in order to remove single object from DataService
        // this.showNotification(
        //   'snackbar-danger',
        //   'Delete Record Successfully...!!!',
        //   'bottom',
        //   'center'
        // );
      }
    });
  }

  editCall(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        contact: row,
        action: 'edit'
      },
      direction: tempDirection
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        setTimeout(() => {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        this.refresh(this.urlData[1]);;
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] =
          this.contactService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
        // this.showNotification(
        //   'snackbar-success',
        //   'Edit Record Successfully...!!!',
        //   'bottom',
        //   'center'
        // );
        }, 3000);
      }
    });
  }

  messageCall(row) {
    this.id = row.id;
    let tempDirection;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormMessageComponent, {
      data: {
        contact: row,
        action: 'edit'
      },
      direction: tempDirection
    });
    // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 1) {
    //     // When using an edit things are little different, firstly we find record inside DataService by id
    //     const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
    //       (x) => x.id === this.id
    //     );
    //     // Then you update that record using data from dialogData (values you enetered)
    //     this.exampleDatabase.dataChange.value[foundIndex] =
    //       this.contactService.getDialogData();
    //     // And lastly refresh table
    //     this.refreshTable();
    //     this.showNotification(
    //       'black',
    //       'Edit Record Successfully...!!!',
    //       'bottom',
    //       'center'
    //     );
    //   }
    // });
  }


  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
        this.selection.select(row)
      );
  }

  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      this.notificationsService.showNotification('This fonction is not ready yet. Please try again later.', 'warning', 5000)
      this.exampleDatabase.dataChange.value.splice(index, 1);
      this.refreshTable();
      this.selection = new SelectionModel<Contact>(true, []);
    });
    // this.showNotification(
    //   'snackbar-danger',
    //   totalSelect + ' Record Delete Successfully...!!!',
    //   'bottom',
    //   'center'
    // );
  }

  public loadData() {
    this.exampleDatabase = new ContactService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }

  // context menu
  onContextMenu(event: MouseEvent, item: Contact) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem('mouse');
    this.contextMenu.openMenu();
  }
}

export class ExampleDataSource extends DataSource<Contact> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Contact[] = [];
  renderedData: Contact[] = [];
  constructor(
    public exampleDatabase: ContactService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Contact[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page
    ];
    this.exampleDatabase.getAllContacts();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((contact: Contact) => {
            const searchStr = (
              contact.firstName +
              contact.lastName +
              contact.email +
              contact.phone +
              // contact.gender +
              // contact.birthday +
              // contact.address +
              // contact.country +
              contact.city
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }

  disconnect() { }
  /** Returns a sorted copy of the database data. */
  sortData(data: Contact[]): Contact[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'firstName':
          [propertyA, propertyB] = [a.firstName, b.firstName];
          break;
        case 'lastName':
          [propertyA, propertyB] = [a.lastName, b.lastName];
          break;
        case 'email':
          [propertyA, propertyB] = [a.email, b.email];
          break;
        // case 'address':
        //   [propertyA, propertyB] = [a.address, b.address];
        //   break;
        case 'phone':
          [propertyA, propertyB] = [a.phone, b.phone];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
