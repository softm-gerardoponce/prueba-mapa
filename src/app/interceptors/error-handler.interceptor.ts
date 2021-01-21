import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
/*
import { ToastrService } from 'ngx-toastr';
import { ToastMessages } from 'app/shared/classes/ToastMessages';
import { ErrorMessages } from 'app/shared/classes/errormessages';
import { AuthService } from 'app/shared/auth/auth.service';*/

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  //message : ToastMessages = new ToastMessages(this.toastr);

  constructor(
   // private toastr:ToastrService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
        tap(evt => {
          
          if (evt instanceof HttpResponse) {            
              console.log("Evento", evt)
          //    this.message.showWarningMessage(evt.body, "Logout")
          }        
        }),
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            errorMsg = `Error: ${error.error.message}`;
          }
          else {
            console.log('this is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            //this.message.showErrorMessage(ErrorMessages.ErrorServidor, "Error")
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      )
      
  }

}
