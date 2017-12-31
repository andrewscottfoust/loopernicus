import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SamplesService } from '../../services/samples.service';
import { LoopsService } from '../../services/loops.service';
import { Loop } from '../../models/Loop';
import { Sample } from '../../models/Sample';
import { SamplePlayerComponent } from '../sample-player/sample-player.component';
import { LoopPlayerComponent } from '../loop-player/loop-player.component';
import 'hammerjs';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log(event.code);
    let curSample: any;
    let curVolume: number = .5;
    let curPan: number = 0;
    switch (event.code) {
      case "KeyR":
        if (this.projectPlayer.projectPlaying) {
          this.recordNote(this.recordTrackNum);
          this.projectHasBeenEdited = true;
        }
        break;
      case "Numpad0":
        this.recordNote(0);
        break;
      case "Numpad1":
        this.recordNote(1);
        break;
      case "Numpad2":
        this.recordNote(2);
        break;
      case "Numpad3":
        this.recordNote(3);
        break;
      case "Numpad4":
        this.recordNote(4);
        break;
      case "Numpad5":
        this.recordNote(5);
        break;
      case "Numpad6":
        this.recordNote(6);
        break;
      case "Numpad7":
        this.recordNote(7);
        break;
      case "Numpad8":
        this.recordNote(8);
        break;
      case "Numpad9":
        this.recordNote(9);
        break;
      default:
    }
  }

  /*user*/
  currentUserID: string;
  editorIsCreator: boolean = true;
  /*route*/
  id: string;
  /*item browser*/
  itemBrowserType: string;
  itemBrowserOpen: boolean = false;
  /*settings bar*/
  categories: any[];
  loopPlayback: boolean = true;
  /*measures bar*/
  /*players*/
  samplePlayer: SamplePlayerComponent;
  projectPlayer: any;
  /*project*/
  project: any = {
    name: 'Enter project name',
    description: 'Enter project description.',
    category: '',
    data: [
    ],
    tempo: 120,
    measures: 4
  };

  projectPlaying: boolean = false;

  isNewTrack: boolean = true;
  editTrackNum: number = null;
  recordTrackNum: number = null;
  projectHasBeenEdited: boolean = false;
  macroEdit: boolean = true;
  macroTrackDetailsOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private samplesService: SamplesService,
    private loopsService: LoopsService
  ) {

    /*user*/
    let user = this.authService.getCurrentUser();
    this.currentUserID = user.uid;

    /*players*/
    this.samplePlayer = new SamplePlayerComponent(this.samplesService);

    /*route params*/
    this.id = this.route.snapshot.params['id'];

    this.itemBrowserType = "sample";
    this.projectPlayer = new LoopPlayerComponent(this.samplesService, this.loopsService);

    /*get loop data*/
    if (this.id != null && this.id != undefined) {
      this.loopsService.getLoop(this.id).subscribe(loop => {
        this.project = loop;
        this.projectPlayer.init(loop);
        if (this.currentUserID != this.project.userID) {
          this.editorIsCreator = false;
          this.project.name += " Copy";
        }
      });
    } else {
      this.project.volume = .5;
      this.projectPlayer.init(this.project);
    }

    this.categories = this.loopsService.getLoopCategories();

  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.projectPlayer.stop();
  }

  /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  /*     UTILITY FUNCTIONS     */
  /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  /*     SETTINGS BAR     */
  /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  play() {
    this.projectPlayer.play(this.project, this.project.tempo, this.loopPlayback, this.project.pan, this.project.volume, this.project.measures);
    this.projectPlayer.position = 0;
    this.projectPlaying = true;
  }

  stop() {
    this.projectPlayer.stop();
    this.projectPlaying = false;
  }

  updateCategory(category: string) {
    this.project.category = category;
  }

  getBPM(tempo: number) {
    return (60000 / tempo) / 4;
  }

  handleLoopButtonClick() {
    this.loopPlayback = !this.loopPlayback;
    this.projectPlayer.loopPlayback = this.loopPlayback;
  }

  saveProject() {
    if (this.id != null && this.id != undefined && this.project.userID == this.currentUserID) {
      this.loopsService.updateLoop(this.id, this.project);
    } else {
      this.project.userID = this.currentUserID;
      this.loopsService.addLoop(this.project);
    }

    this.projectPlayer.stop();
    this.projectHasBeenEdited = false;
  }

  deleteProject() {

    if (confirm("Are you sure you want to delete this loop?")) {
      this.loopsService.deleteLoop(this.id);
      this.router.navigate(['/games/looper/']);
    }
  }

  /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  /*     MEASURES BAR     */
  /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  measuresInputChange(value: number) {
    if (value < this.project.measures) {
      if (confirm("This number will result in deleted measures. Do you wish to proceed?")) {
        this.updateMeasures(value);
      }
    } else {
      this.updateMeasures(value);
    }
  }

  updateMeasures(numMeasures: number) {
    console.log(this.project);
    let numDifference: number;
    if (numMeasures > this.project.measures) {

      numDifference = numMeasures - this.project.measures;

      for (let i = 0; i < this.project.data.length; i++) {
        for (let m = 0; m < numDifference; m++) {
          for (let t = 0; t < 16; t++) {
            this.project.data[i].data.push(0);
          }
        }
      }
    } else {
      numDifference = this.project.measures - numMeasures;
      for (let i = 0; i < this.project.data.length; i++) {
        this.project.data[i].data.splice(numMeasures * 16, numDifference * 16);
      }
      console.log(numMeasures, numDifference, this.project);
    }
    this.project.measures = numMeasures;
    this.projectPlayer.measures = this.project.measures;
    this.projectPlayer.curMeasure = 0;
  }

  /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  /*     ITEM BROWSER     */
  /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  itemBrowserUpdated(obj: any) {
    console.log("itemBrowserUpdated: ", obj);
    switch (obj.type) {
      case "addItem":
        this.addBrowserItem(obj.value);
        console.log(obj.value);
        break;
      case "closeItemBrowser":
        this.itemBrowserOpen = false;
        this.editTrackNum = null;
        break;
      default:

    }
  }

  updateProject(trackNum: number, itemNum: number) {
    let item = this.project.data[trackNum].data[itemNum];
    if (item == 0) {
      item = 1;
      this.samplesService.getSample(this.project.data[trackNum].sampleID).subscribe(sample => {
        this.samplePlayer.playSample(sample, this.project.data[trackNum].volume, 0);
      });
    } else {
      item = 0;
    }
    this.project.data[trackNum].data[itemNum] = item;
  }

  /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
  /*     TRACK EDITOR     */
  /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

  deleteTrack(trackNum: number) {
    if (confirm("Are you sure you want to delete this track?")) {
      this.project.data.splice(trackNum, 1);
      this.projectHasBeenEdited = true;
    }
  }

  enableRecording(trackNum: number) {
    if (this.recordTrackNum != trackNum) {
      this.recordTrackNum = trackNum;
    } else {
      this.recordTrackNum = null;
    }
  }

  recordNote(trackNum: number) {
    //if (this.recordTrackNum != null) {
    if (this.projectPlaying) {
      this.project.data[trackNum].data[this.projectPlayer.position] = 1;
    }

    this.samplesService.getSample(this.project.data[trackNum].sampleID).subscribe(sample => {
      this.samplePlayer.playSample(sample, this.project.data[trackNum].volume, 0);
    });
    //}

  }

  muteTrack(trackNum: number) {
    this.project.data[trackNum].muted = !this.project.data[trackNum].muted;
    this.projectHasBeenEdited = true;
  }

  changeTrack(trackDataNum: number) {
    this.editTrackNum = trackDataNum;
    this.itemBrowserOpen = true;
    this.isNewTrack = false;
    this.projectHasBeenEdited = true;
  }

  addBrowserItem(item: any) {

    if (this.isNewTrack == true) {
      this.project.data.push(this.createBlankTrackItem(item));
      this.projectPlayer.stop();
      this.projectPlaying = false;
    } else {
      this.project.data[this.editTrackNum].sampleID = item.key;
      this.editTrackNum = null;
    }

    this.itemBrowserOpen = false;
    this.isNewTrack = true;
    this.projectHasBeenEdited = true;

  }

  createBlankTrackItem(item: any) {
    let data: any[] = [];
    let i: number = 0;
    let obj: any = {};

    for (i = 0; i < this.project.measures * 16; i++) {
      data.push(0);
    }

    obj = {
      sampleID: item.key,
      sampleName: item.patch + ": " + item.sample,
      muted: false,
      randomizeVolume: false,
      data: data,
      pan: 0,
      loopVolume: .5
    };

    return obj;
  }

}
