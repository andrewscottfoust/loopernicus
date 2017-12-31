import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { SamplesService } from '../../services/samples.service';
import { LoopsService } from '../../services/loops.service';
import { SamplePlayerComponent } from '../sample-player/sample-player.component';
import { Loop } from '../../models/Loop';

@Component({
  selector: 'app-loop-player',
  templateUrl: './loop-player.component.html',
  styleUrls: ['./loop-player.component.css']
})
export class LoopPlayerComponent implements OnInit {

  
  loop:Loop;
  tempo:number;
  loopPlayback: boolean = false;
  pan:number;
  volume:number;
  measures:number;
  numSteps:number;
  numTracks:number;
  curMeasure:number = 0;
  curMeasureStartNum:number = 0;

  samplePlayer: SamplePlayerComponent;
  timerObservable: any;
  projectPlaying: boolean = false;
  
  position: number = 0;
  sampleVolume: number = 0;

  constructor(
    private samplesService: SamplesService,
    private loopsService: LoopsService
  ) {
    this.sampleVolume = this.samplesService.getSampleVolume();
    this.samplePlayer = new SamplePlayerComponent(this.samplesService);
  }

  ngOnInit() {

  }

  init(loop:Loop) {
    this.loop = loop;
    this.measures = loop.measures;
    this.samplePlayer.unloadAllSounds();
  }

  play(loop: any, tempo:number = 120, loopPlayback:boolean, pan:number, volume:number, measures:number) {

    this.loop = loop;
    this.tempo = tempo;
    this.loopPlayback = loopPlayback;
    this.pan = pan;
    this.volume = volume;
    this.measures = measures;

    this.numSteps = measures * 16;
    this.numTracks = loop.data.length;
    this.curMeasure = 0;
    this.position = 0;

    let measureCounter:number = 0;
    
    if(this.tempo == undefined) {
      this.tempo = loop.tempo;
    }

    if(this.loopPlayback == undefined) {
      this.loopPlayback = true;
    }

    if (this.projectPlaying) {
      this.timerObservable.unsubscribe();
    }

    this.playAtPosition(this.position);
    this.position = 1;
    
    this.timerObservable = Observable.interval(this.tempo).subscribe(() => {
      if(this.position < this.numSteps - 1) {
        this.position++;
      } else {
        if(this.loopPlayback == true) {
          this.position = 0;
          this.curMeasure = 0;
          measureCounter = 0;
          this.curMeasureStartNum = 0;
        } else {
          this.projectPlaying = false;
          this.timerObservable.unsubscribe();
        }
      }

      if(measureCounter < 15) {
        measureCounter++;
      } else {
        measureCounter = 0;
      }

      if(measureCounter == 15 && this.curMeasure < this.measures - 1) {
        this.curMeasure++;
        this.curMeasureStartNum = this.curMeasure * 16;
      }



      this.playAtPosition(this.position);
      
    });

    this.projectPlaying = true;

  }

  playAtPosition(pos:number) {
    
    for (let t = 0; t < this.numTracks; t++) {
      
      let sampleID = this.loop.data[t].sampleID;
      let loopItem = this.loop.data[t].data[this.position];

      if(loopItem == 1) {

        this.samplesService.getSample(sampleID).subscribe(sample => {

          let vol:number;

          if(this.loop.data[t].randomizeVolume == true) {
            vol = this.getRandomVolume(this.loop.data[t].loopVolume);
          } else {
            vol = this.loop.data[t].loopVolume;
          }

          if(!this.loop.data[t].muted) {
            this.samplePlayer.playSample(sample, vol, this.loop.data[t].pan);
          }
          
        });
      }
    }
  }

  stop() {
    if (this.projectPlaying) {
      this.timerObservable.unsubscribe();
      this.projectPlaying = false;
      this.samplePlayer.unloadAllSounds();
    }
  }

  getRandomVolume(volume:number) {
    return volume - (Math.random() * (volume / 2));
  }

  changeMeasure(direction:string) {
    if(direction == 'next') {
      this.curMeasure++;
    } else {
      this.curMeasure--;
    }
    if(this.curMeasure >= this.measures) {
      this.curMeasure = 0;
    }
    if(this.curMeasure < 0) {
      this.curMeasure = this.measures - 1;
    }
    this.curMeasureStartNum = this.curMeasure * 16;
  }

  goToMeasure(measure:number) {
    this.curMeasure = measure;
    this.curMeasureStartNum = this.curMeasure * 16;
  }

}
