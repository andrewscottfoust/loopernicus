import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoopsService } from '../../services/loops.service';
import { SamplesService } from '../../services/samples.service';
import { Loop } from '../../models/Loop';
import { LoopPlayerComponent } from '../loop-player/loop-player.component';
import 'hammerjs';

@Component({
  selector: 'app-loop-share',
  templateUrl: './loop-share.component.html',
  styleUrls: ['./loop-share.component.css']
})
export class LoopShareComponent implements OnInit, OnDestroy {

  id: string;
  projectPlayer: any;
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
  loopPlayback: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private samplesService: SamplesService,
    private loopsService: LoopsService
  ) {
    /*route params*/
    this.id = this.route.snapshot.params['id'];

    this.projectPlayer = new LoopPlayerComponent(this.samplesService, this.loopsService);

    if (this.id != null && this.id != undefined) {
      this.loopsService.getLoop(this.id).subscribe(loop => {
        this.project = loop;
        this.projectPlayer.init(loop);
      });
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.projectPlayer.stop();
  }

  play() {
    this.projectPlayer.play(this.project, this.project.tempo, this.loopPlayback, this.project.pan, this.project.volume, this.project.measures);
    this.projectPlayer.position = 0;
    this.projectPlaying = true;
  }

  stop() {
    this.projectPlayer.stop();
    this.projectPlaying = false;
  }

  handleLoopButtonClick() {
    this.loopPlayback = !this.loopPlayback;
    this.projectPlayer.loopPlayback = this.loopPlayback;
  }

}
