import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { environment } from 'src/environments/environment';
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore/lite';
import { BarcodeFormat } from '@zxing/library';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  items!: Observable<any[]>;
  newItem: string = "";
  basededatos: any;
  formats: BarcodeFormat[] = [BarcodeFormat.QR_CODE];

  constructor() {
    //this.items = db.list('items').valueChanges();
    const app = initializeApp(environment.firebaseConfig);
    const analytics = getAnalytics(app);

    //console.log(analytics);

    this.basededatos = getFirestore(app);

    //console.log(this.basededatos);

    console.log(this.getCities());
  }

  ngOnInit(): void {
  }

  async getCities() {
    const citiesCol = collection(this.basededatos, 'alumnos');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
  }


  async writeData(resultString: string) {
    console.log(resultString);
    alert(resultString);
    /*const dbRef = ref(this.basededatos, 'usuarios/');
    set(dbRef, { name: 'item1', value: 'value1' });*/
    const docRef = await addDoc(collection(this.basededatos, "alumnos"), JSON.parse(resultString));

  }
}
