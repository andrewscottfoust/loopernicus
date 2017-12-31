import { Component, OnInit } from '@angular/core';
import { SamplesService } from '../../services/samples.service';
import { Sample } from '../../models/Sample';
import { Howl } from 'howler';

@Component({
  selector: 'app-sample-player',
  templateUrl: './sample-player.component.html',
  styleUrls: ['./sample-player.component.css']
})
export class SamplePlayerComponent implements OnInit {

  howlObjects:any[] = [];
  quality:string = "low";
  soundsPlayedArray:any[] = [];
  howl:Howl;

  constructor(
    private samplesService: SamplesService
  ) { }

  ngOnInit() {
  }

  playSample(sample:any, volume:number, pan:number) {
    let sampleIsNew = true;
    var sound:any;

    for(let i = 0; i < this.howlObjects.length; i++) {
      if(this.howlObjects[i].file == sample.file) {
        sampleIsNew = false;
      }
    }
    
    sound = new Howl({
      src: ['assets/audio/' + this.quality + "/" + sample.file],
      autoplay: false,
      loop: false,
      volume: volume,
      rate:1,
      format: ['mp3']
    });

    this.soundsPlayedArray.push(sound);
    
    sound.stereo(pan);
    sound.play();

  }

  unloadAllSounds() {
    for(let i = 0; i < this.soundsPlayedArray.length; i++) {
      this.soundsPlayedArray[i].unload();
    }
  }

}
