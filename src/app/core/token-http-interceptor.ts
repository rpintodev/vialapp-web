import { HttpInterceptorFn } from "@angular/common/http";

export const tokenHttpInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });

  return next(authReq);
};