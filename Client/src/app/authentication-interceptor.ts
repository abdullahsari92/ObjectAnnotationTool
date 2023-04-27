import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';


@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {


	headers: HttpHeaders | undefined;

	updatedRequest:any;
	constructor(
		private router: Router,
	) {}


	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

			this.headers = new HttpHeaders({
				'Content-Type': 'application/json',
				//'Authorization': "Bearer "		
			});

			this.updatedRequest = request.clone({ headers: this.headers});
		

		return next.handle(this.updatedRequest).pipe(
			tap(
				event => {

			
					if (event instanceof HttpResponse) {
						if (event.status === 401) {
							this.router.navigate(['/User/MyProfile']);
						
						} else {
					
						}
					}
				},
				error => {
					if (error.status === 401) {
								
						  this.router.navigate(['/auth/login']);
				
					} else {
						console.log('api call error :', error);
					
					}
				}
			)
		);
	}
}
