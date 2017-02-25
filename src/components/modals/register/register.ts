import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { App } from '../../../providers/app';

import { LMS } from '../../../providers/lms';

import {
    RESPONSE,
    USER_REGISTER_REQUEST_DATA,
    USER_UPDATE_REQUEST_DATA,
    USER_UPDATE_RESPONSE_DATA,
    USER_REGISTER_RESPONSE_DATA
} from './../../../angular-backend/interface';
import { User } from './../../../angular-backend/user';
@Component({
    selector:'register-component',
    templateUrl: 'register.html'
})

export class RegisterComponent{


    loading     : boolean = false;
    form = <USER_REGISTER_REQUEST_DATA> {};
    //form = {};
    login: boolean = false;
    result: RESPONSE = <RESPONSE> {};
    constructor (
        private app          : App,
        private activeModal  : NgbActiveModal,
        private lms          : LMS,
        private user         : User
    ) {

        //this.login = this.user.isLogin();
        this.form['gender'] = ""; //Default Select gender
        // this.fakeData();
        //this.onClickRegister();
        // this.register();


    }

    // testforumpost(){
    //     this.forum
    //         .data('post', 'another post test')
    //         .data('comment', 'comment test')
    //         .create('QnA', res =>{
    //             console.log('res :: ' + res);
    //     }, err =>{
    //         this.app.alert('error :: ' + err );
    //     }, ()=> console.info( 'completed ') )
    // }


    onEnterRegister(event){
        // if( event.keyCode == 13){
        //     if( this.user.loggedIn ) this.updateProfile( callback => this.updateLMSprofile() );
        //     else this.register( callback => this.lmsregister( ) );
        // }
    }

    fakeData() {
        let id = 'user' + (new Date).getHours() + (new Date).getMinutes() + (new Date).getSeconds();
        
        this.form.id = id;
        this.form.email = id + '@gmail.com';
        this.form.name = id;
        this.form.password = id;
        this.form.mobile = '09174678000';
        this.form.gender = 'M';
        this.form.birthday = '1990-12-30';
        
    }

    onClickDismiss() {
        this.activeModal.close();
    }

    ngOnInit(){
        if ( this.user.logged ) {
            console.log("get me");
            this.getUserData();
        }
    }
    onClickRegister() {
        this.register( callback => this.lmsRegister() );


    }
    onClickUpdate() {
        this.updateProfile( callback => this.updateLMSprofile() );
    }

    getUserData() {
        this.loading = true;
        this.user.getUserData().subscribe( (res: any) => {
            if ( this.user.base.isError( res ) ) this.error( res );
            else this.getDataSuccess( res );
        }, error => {
            this.error( error );
        } );
    }
    register( callback? ) {
        if ( this.validate() == false ) return;
        this.loading = true;
        this.user.register( this.form ).subscribe( (res: any) => {
            if ( this.user.base.isError( res ) ) this.error( res );
            else this.successRegister( res );
        }, error => {
            this.error( error );
        } );
    }

    getDataSuccess( res:any ) {
        console.log(res);
        this.form = res['data'].user;
    }
    successRegister( res: USER_REGISTER_RESPONSE_DATA) {
        console.log("user register success: ", res );
        this.loading = false;
        this.activeModal.close();
    }

    error( error ) {
        this.loading = false;
        this.result = error;
        console.log( this.result );
        return this.user.base.errorHandler( error );
    }

    lmsRegister(){
        this.lms.register( this.form, res =>{
            console.log(' registered on centerX ' + res );
            this.activeModal.close();
        }, error => console.error(' error on registration ' + error ) )
    }



    updateProfile( callback ){
        if ( this.validate() == false ) return;
        this.loading = true;
        let data : USER_UPDATE_REQUEST_DATA = {
            name: this.form.name,
            nickname: this.form.nickname,
            mobile: this.form.mobile,
            birthday: this.form.birthday,
            gender: this.form.gender
        }
        this.user.update( data ).subscribe( (res: any) => {
            if ( this.user.base.isError( res ) ) this.error( res );
            else this.successUpdate( res );
        }, error => {
            this.error( error );
        } );
        /*
        let data : USER_UPDATE_REQUEST_DATA ={
            name: this.form.name,
            nickname: this.form.nickname,
            mobile: this.form.mobile,
            landline: this.form.landline,
            gender: this.form.gender,
            birthday: this.form.birthday,
            country: this.form.country,
            province: this.form.province,
            city: this.form.city,
            address: this.form.address,
            zipcode: this.form.zipcode,
        }
        this.user.update( data, res =>{
            console.info( 'updated profile' + res );
        }, err =>console.error( 'error on update ' + err ), ()=>{});
        */
    }
    successUpdate( res: USER_UPDATE_RESPONSE_DATA) {
        console.log("user update success: ", res );
        this.loading = false;
        this.activeModal.close();
    }
    updateLMSprofile(){
        this.lms.update( this.form , res =>{
            console.log(' lms user updated ' + res );
            this.activeModal.close();
        }, err =>{})
    }

    validate() {
        console.log('form: ', this.form);
/*


        if ( ! this.form.id ) return this.validateError('ID');
        if( this.form.id.match(/[.#$\[\]]/g)) return this.validateError('valid id');
        if ( ! this.form.email ) return this.validateError('Email');
        if( ! this.form.password )return this.validateError('Password');

        if ( ! this.form.name ) return this.validateError('Name');
        if ( ! this.form.mobile ) return this.validateError('Mobile');
        if ( ! this.form.gender ) return this.validateError('Gender');
        if ( ! this.form.birthday ) return this.validateError('birthday');
*/
        return true;
    }

    validateError( name ) {
        this.app.alert( name + ' is required ...' );
        return false;
    }


}