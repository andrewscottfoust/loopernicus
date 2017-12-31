import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { Sample } from '../../models/Sample';
import { SamplesService } from '../../services/samples.service';
import { SamplePlayerComponent } from '../sample-player/sample-player.component';

@Component({
  selector: 'app-sample-list',
  templateUrl: './sample-list.component.html',
  styleUrls: ['./sample-list.component.css']
})
export class SampleListComponent implements OnInit {

  samples$;
  tempSample = {
    name: 'Drum Kit 01: Tambourine',
    description: 'Snare Tambourine',
    file: 'percussion-drum-kit-01-tabourine.mp3',
    category: 'drum-kits'
  }
  sampleVolume:number = 0;
  samplePlayer:SamplePlayerComponent;

  constructor(
    private samplesService:SamplesService
  ) {

    this.samplesService.getSamples().subscribe(samples => {
      this.samples$ = samples;
    });

    this.sampleVolume = this.samplesService.getSampleVolume();

    this.samplePlayer = new SamplePlayerComponent(this.samplesService);

   }

  ngOnInit() {
    
  }
  

  addSample(sample:any) {
    this.samplesService.addSample(sample);
  }

  playSample(sample:any) {
    this.samplePlayer.playSample(sample, this.sampleVolume,0);
  }

  createDrumSamples() {
    let fileName = "big-perc-";
    let sampleName = "Big Perc ";
    let category = "big perc";
    let sampleNameArray = [
      "Low",
      "Mid",
      "High"
    ]

    let fileNameArray = [
      "low",
      "mid",
      "high",
    ]

    for(let i = 0; i < sampleNameArray.length; i++) {
      let obj = {
        name: sampleName + sampleNameArray[i],
        description: sampleName + sampleNameArray[i],
        file: fileName + fileNameArray[i] + ".mp3",
        category: category
      }
      this.addSample(obj);
    }
  }
  createPitchedSamples() {
    let fileName = "book-piano-";
    let sampleName = "Book Piano ";
    let category = "book piano";
    let sampleNameArray = [
      "C3",
      "C#3",
      "D3",
      "D#3",
      "E3",
      "F3",
      "F#3",
      "G3",
      "G#3",
      "A3",
      "A#3",
      "B3",
      "C4"
    ]

    let fileNameArray = [
      "c3",
      "c+3",
      "d3",
      "d+3",
      "e3",
      "f3",
      "f+3",
      "g3",
      "g+3",
      "a3",
      "a+3",
      "b3",
      "c4"
    ]

    for(let i = 0; i < sampleNameArray.length; i++) {
      let obj = {
        name: sampleName + sampleNameArray[i],
        description: sampleName + sampleNameArray[i],
        file: fileName + fileNameArray[i] + ".mp3",
        category: category
      }
      this.addSample(obj);
    }
  }

}
