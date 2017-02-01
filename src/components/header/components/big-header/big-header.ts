import { Component } from '@angular/core';
import { App } from '../../../../providers/app';
import { User } from '../../../../api/firebase-api-2.0/user';
@Component({
    selector: 'big-header-component',
    templateUrl: 'big-header.html'
})
export class BigHeaderComponent {
    event:any = {};
    more: boolean = false;
    constructor( 
        public app: App,
        private user: User 
        ) {

    }
    onClickLogout(){
        this.event.eventType = "logout";
        this.app.myEvent.emit( this.event );
    }
    onClickUpdateProfile(){
        this.event.eventType = "update";
        this.app.myEvent.emit( this.event );
    }
    onClickMoreMenu() {
        this.more = ! this.more;
    }
    onClickPanelMenu( name ) {
        this.more = false;
        this.app.scrollTo( name );
    }
    onClickLogin(){
        this.event.eventType = "login";
        this.app.myEvent.emit(this.event);

    }
    onClickGotoClassRoom(){
        this.event.eventType = "enter-classroom";
        this.app.myEvent.emit(this.event);
    }
    
    onClickRegister() {
        this.event.eventType = "register";
        this.app.myEvent.emit(this.event);
    }
}