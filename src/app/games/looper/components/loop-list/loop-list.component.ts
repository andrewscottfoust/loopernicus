import { Component, OnInit } from '@angular/core';
import { Loop } from '../../models/Loop';
import { SamplesService } from '../../services/samples.service';
import { LoopsService } from '../../services/loops.service';
import { LoopPlayerComponent } from '../loop-player/loop-player.component';

@Component({
  selector: 'app-loop-list',
  templateUrl: './loop-list.component.html',
  styleUrls: ['./loop-list.component.css']
})
export class LoopListComponent implements OnInit {

  loopPlayer:LoopPlayerComponent;
  loops$;

  tempLoop = {
    userID: '',
    name: 'Snare, Bass, and Rubber Band',
    description: 'Just a test loop.',
    category: 'percussion',
    data: [
      {
        sampleID: '-KyXYAbi_GBoNCZj0Lz2',
        data: [
          1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,1
        ]
      },
      {
        sampleID: '-KyXjbtvDPPXSsYu7HKn',
        data: [
          1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0
        ]
      },
      {
        sampleID: '-Kyqy2jJ1-pA5iyePuv_',
        data: [
          1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
        ]
      }
    ],
    tempo: 100,
    volume: .5,
    measures: 4
  }

  sampleVolume:number = 0;

  constructor(
    private samplesService: SamplesService,
    private loopsService: LoopsService
  ) {

    this.loopsService.getLoops().subscribe(loops => {
      this.loops$ = loops;
    });

    this.loopPlayer = new LoopPlayerComponent(this.samplesService, this.loopsService);

  }

  ngOnInit() {
    
  }

  addLoop() {
    this.loopsService.addLoop(this.tempLoop);
  }

  playLoop(loop: Loop) {
    this.loopPlayer.play(loop, loop.tempo, true, 0, loop.volume, loop.measures);
  }

  stopLoop() {
    this.loopPlayer.stop();
  }

}
