import { Component, OnInit  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModal } from '../modals/login/login'; 
import { RegisterComponent } from '../modals/register/register';
import { User } from '../../api/firebase-api-2.0/user';
import { UserTest } from '../../api/firebase-api-2.0/test/user-test';
import { App } from '../../providers/app';

@Component({
    selector: 'header-component',
    templateUrl: 'header.html'
})
export class HeaderComponent implements OnInit {
    event:any = {};
    random;
    ctr: number = 0;
    uid;
    
    more: boolean = false;
    login: boolean = false;
    constructor( 
        private modal       : NgbModal,
        private user        : User,
        private userTest    : UserTest,
        private app         : App
    ) {
        // userTest.run();
        console.log('header :: constructor(), loginUser: ', user.loginUser);
        this.login = user.loggedIn;
        console.log("user login status: ", this.login);
        this.listenEvents();
    }
    
    listenEvents() {
        this.app.myEvent.subscribe( item => {
        if( item.eventType == "login") {
            this.onClickLogin();
        }
        if( item.eventType == "enter-classroom") {
            this.onClickGotoClassRoom();
        }
        if( item.eventType == "register") {
            this.onClickRegister();
        }
        if( item.eventType == "logout" ){
            this.login = false;
            this.onClickLogout();
        }
        if( item.eventType == "update" ){
            this.onClickUpdateProfile();
        }
        
        });
    }
    ngOnInit() {

    }
    onClickLogin(){
        console.log('login');
        let modalRef = this.modal.open( LoginModal );
        
        modalRef.result.then( (x) => {
            console.log( this.user.loginUser );
            this.login = this.user.loggedIn;
            console.log("user login status: ", this.login);
            if( this.login ) {
                this.event.eventType = "loggedin";
                this.app.myEvent.emit(this.event);
            }
        }).catch( () => console.log('exit') );

    }
    onClickGotoClassRoom(){
        window.open(
            `https://video.withcenter.com/room/${this.user.loginUser.name}/testroom`,
            '_blank'
        )
    }
    
    onClickRegister() {
        let modalRef = this.modal.open ( RegisterComponent );
        modalRef.result.then( (x) => {
            console.log( this.user.loginUser );
            this.login = this.user.loggedIn;
            console.log("user login status: ", this.login);
        }).catch( () =>console.log('exit '));
    }





    onClickLogout() {
        this.login = false;
        this.user.logout( () => {
            console.info('user login status: ', this.login);
            if( ! this.user.login ){
                this.event.eventType = "loggedout";
                this.app.myEvent.emit(this.event);
            }
        },
        (e) => console.error('logout error: ', e),
        () => {} );
    }


    onClickUpdateProfile(){
        console.log('uid ' + JSON.stringify(this.user.loginUser));
        let modalRef = this.modal.open( RegisterComponent );
            modalRef.result.then(() => {}).catch( () =>console.log('exit '));
    }

    onClickMoreMenu() {
        this.more = ! this.more;
    }

    /**
     * ================= ScrollSpy + Affix ======================
     */

    onClickMenu( name ) {
        this.app.scrollTo( name );
    }

    onClickPanelMenu( name ) {
        this.more = false;
        this.app.scrollTo( name );
    }
    

}
