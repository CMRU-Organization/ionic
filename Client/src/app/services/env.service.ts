import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  //API_URL = 'http://www.regapp.cmru.ac.th/api';
  API_URL = 'http://localhost:9000/api';
  constructor() { }
}
