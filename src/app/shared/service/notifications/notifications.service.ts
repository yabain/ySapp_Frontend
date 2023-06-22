import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(
    private snackBar: MatSnackBar
  ) {
  }

  showNotification(text?, colorName?, timer?: number, placementFrom?, placementAlign?) {
    timer = timer || 5000;
    colorName = 'snackbar-' + colorName || 'black'; // back -or- snackbar-success -or- snackbar-danger -or- snackbar-warning -or- snackbar-info
    placementFrom = placementFrom || 'bottom'; // top or bottom 
    placementAlign  = placementAlign || 'right'; // right -or- left -or- center

    this.snackBar.open(text, '', {
      duration: timer,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName
    });
  }

  /// Dialogd
  dialogShowCustomPosition(text?, icon?, timer?) {
    Swal.fire({
      position: 'top-end',
      icon: icon || 'success',
      title: text || 'Done',
      showConfirmButton: false,
      timer: timer || 5000
    });
  }
  
  dialogShowBasicMessage() {
    Swal.fire('Here is a message!');
  }

  dialogShowWithTitleMessage() {
    Swal.fire('The Internet?', 'That thing is still around?', 'question');
  }

  dialogShowTitleErorIcon() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href>Why do I have this issue?</a>'
    });
  }

  dialogShowLongContent() {
    Swal.fire({
      imageUrl: 'https://placeholder.pics/svg/300x1500',
      imageHeight: 1500,
      imageAlt: 'A tall image'
    });
  }

  dialogShowCustomHtml() {
    Swal.fire({
      title: '<strong>HTML <u>example</u></strong>',
      icon: 'info',
      html:
        'You can use <b>bold text</b>, ' +
        '<a href="//sweetalert2.github.io">links</a> ' +
        'and other HTML tags',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down'
    });
  }
  
  dialogCustomWithFunction() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      }
    });
  }

  dialogPassParameter() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      })
      .then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          );
        }
      });
  }

  dialogRtlSupport() {
    Swal.fire({
      title: 'هل تريد الاستمرار؟',
      icon: 'question',
      iconHtml: '؟',
      confirmButtonText: 'نعم',
      cancelButtonText: 'لا',
      showCancelButton: true,
      showCloseButton: true
    });
  }

  dialogAjaxRequest() {
    Swal.fire({
      title: 'Submit your Github username',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`//api.github.com/users/${login}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url
        });
      }
    });
  }

}
