import { FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Sample } from '../models/Sample';

@Injectable()
export class SamplesService {

  samples$;
  samplesRef;
  menuArray$;
  menuArrayRef;
  sampleVolume:number = .6;

  constructor(
    private db: AngularFireDatabase
  ) {
    this.samplesRef = this.db.list('games/looper/samples', ref => ref.orderByChild('category'));
    this.samples$ = this.samplesRef.snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    });

    this.menuArrayRef = this.db.list('games/looper/menuData', ref => ref.orderByChild('name'));
    this.menuArray$ = this.menuArrayRef.snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    });
  }

  getSamples() {
    return this.samples$;
  }

  getSample(key:string) {
    return this.db.object('games/looper/samples/' + key).valueChanges();
  }

  addSample(patch:Sample) {
    this.samplesRef.push(patch);
  }

  deleteSample(id: string) {
    return this.samplesRef.remove(id);
  }

  getSampleVolume() {
    return this.sampleVolume;
  }

  getMenuArray() {
    return this.menuArray$;
  }

  deleteMenuItem(id: string) {
    return this.menuArrayRef.remove(id);
  }

  addMenuItem(menuArray:any[]) {
    this.menuArrayRef.push(menuArray);
  }

}
