import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    isLoggedIn = false;
    token:any;

    constructor(
        private http: HttpClient,
        private storage: NativeStorage,
        private env: EnvService,
    ) { }

    login(studentcode: String, password: String) {
        return this.http.post(this.env.API_URL + '/login',
            {studentcode: studentcode, password: password}
        ).pipe(
            tap(token => {
                this.storage.setItem('token', token)
                    .then(
                        () => {
                            console.log('Token Stored');
                        },
                        error => console.error('Error storing item', error)
                    );
                this.token = token;
                this.isLoggedIn = true;
                return token;
            }),
        );
    }

    register(fName: String, lName: String, studentcode: String, password: String) {
        return this.http.post(this.env.API_URL + 'auth/register',
            {fName: fName, lName: lName, studentcode: studentcode, password: password}
        )
    }

    logout() {
        const headers = new HttpHeaders({
            'Authorization': "Bearer "+this.token.data
        });

        return this.http.get(this.env.API_URL + '/logout', { headers: headers })
            .pipe(
                tap(data => {
                    console.log("success logout");
                    console.log("success logout"+ this.storage.getItem("token"));
                    this.storage.remove('token');

                    this.isLoggedIn = false;
                    delete this.token;
                    return data;
                })
            )
    }

    user() {
        const headers = new HttpHeaders({
            'Authorization': "Bearer "+this.token.data
        });

        return this.http.get<any>(this.env.API_URL + '/profile ', { headers: headers })
            .pipe(
                tap(user => {
                    return user;
                })
            )
    }

    getToken() {
        return this.storage.getItem('token').then(
            data => {
                this.token = data;

                if(this.token != null) {
                    this.isLoggedIn=true;
                } else {
                    this.isLoggedIn=false;
                }
            },
            error => {
                this.token = null;
                this.isLoggedIn=false;
            }
        );
    }
}