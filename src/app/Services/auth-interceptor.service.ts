import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { EMPTY, exhaustMap, Observable, of, take } from "rxjs";
import { AuthService } from "./auth.service";


export class AuthInterceptorService implements HttpInterceptor{

  constructor(private _authService: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._authService.user.pipe(take(1), exhaustMap(user=>{
      if(!user || !user.token){
        return EMPTY
      }
      const modReq = req.clone({
        params: new HttpParams().set('auth', user.token)
      })
    return next.handle(modReq);
    }))
  }

}
