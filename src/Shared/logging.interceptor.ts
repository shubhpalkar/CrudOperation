import { CallHandler, ExecutionContext, Logger } from "@nestjs/common";
import { Injectable, NestInterceptor } from "@nestjs/common";
import { Console } from "console";
import { Observable, ObservableInput } from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable()
export class loggingInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler, ): Observable<any> {
    // intercept(context: ExecutionContext, call$: Observable<any>): Observable<Response> {

        const req = context.switchToHttp().getRequest();
        const method = req.method;
        const url = req.url;
        const now = Date.now();

            return next.handle().pipe (
            // return call$.pipe (
                tap(() => Logger.log ( '${method} ${url} ${Date.now() - now}ms, context.getClass().name, '))
                
            )
    }

}