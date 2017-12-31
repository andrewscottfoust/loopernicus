import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Loop } from '../models/Loop';

@Injectable()
export class LoopsService {

  loopsRef: AngularFireList<any>;
  loops$: Observable<any[]>;
  categories: any[] = [
    "percussion",
    "melody",
    "pad",
    "mixed"
  ];

  constructor(
    private db: AngularFireDatabase
  ) {
    this.loopsRef = this.db.list('/games/looper/loops', ref => ref.orderByChild('category'));
    this.loops$ = this.loopsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    });
  }

  getLoops() {
    return this.loops$;
  }

  getLoop(key:string) {
    return this.db.object('/games/looper/loops/' + key).valueChanges();
  }

  getLoopPatches(loop:Loop) {
    let loopPatches:any[] = [];
    for(let i = 0; i < loop.data.length; i++) {
      let loopItem = loop.data[i];
      if(loopItem) {
        for(let p = 0; p < loopItem.length; p++) {
          if(!loopPatches.includes(loopItem[p])) {
            loopPatches.push(loopItem[p]);
          }
        }
      }
    }
    return loopPatches;
  }

  addLoop(loop:Loop) {
    this.loopsRef.push(loop);
  }

  updateLoop(id: string, loop: Loop) {
    return this.loopsRef.update(id, loop);
  }

  deleteLoop(id: string) {
    return this.loopsRef.remove(id);
  }

  getLoopCategories() {
    return this.categories;
  }

}
