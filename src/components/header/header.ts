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
        
        //console.log(user.loggedIn);
        //console.log(user);
        // this.onClickRegister();

        // this.onClickLogin();
    }
    onClickLogin(){
        console.log('login');
        let modalRef = this.modal.open( LoginModal );
        
        modalRef.result.then( (x) => {
            console.log( this.user.loginUser );
            this.login = this.user.loggedIn;
            console.log("user login status: ", this.login);
        }).catch( () => console.log('exit') );

    }

    ngOnInit() {

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
        },
        (e) => console.error('logout error: ', e),
        () => {} );
    }


    onClickUpdateProfile(){
        console.log('uid ' + JSON.stringify(this.user.loginUser));
        let modalRef = this.modal.open( RegisterComponent );
            modalRef.result.then(() => {});
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
