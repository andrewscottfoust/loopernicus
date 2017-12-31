import { Sample } from '../../models/Sample';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { SamplesService } from '../../services/samples.service';
import { LoopsService } from '../../services/loops.service';
import { SamplePlayerComponent } from '../sample-player/sample-player.component';

@Component({
  selector: 'app-item-browser',
  templateUrl: './item-browser.component.html',
  styleUrls: ['./item-browser.component.css']
})
export class ItemBrowserComponent implements OnInit {

  @Input() type: string;
  @Input() itemBrowserOpen: boolean;
  @Output() change = new EventEmitter();

  samplePlayer: SamplePlayerComponent;
  sampleVolume: number = 0;

  selectedItem: number;
  menuArray: any[] = [];
  samples: any[] = [];
  itemFilterCategory: string = "all";

  menuState: string = "category";
  selectedCategory: string = "";
  selectedSubcategory: string = "";
  selectedPatch: string = "";

  constructor(
    private samplesService: SamplesService,
    private loopsService: LoopsService
  ) {
    this.sampleVolume = this.samplesService.getSampleVolume();
    this.samplePlayer = new SamplePlayerComponent(this.samplesService);
  }

  ngOnInit() {
    this.samplesService.getSamples().subscribe(samples => {
      this.samples = samples;
    });

    this.samplesService.getMenuArray().subscribe(menu => {
      this.menuArray = menu;
    });
  }

  itemBrowserStateChange(type: string, value: any) {
    this.change.emit({ type: type, value: value });
  }

  addItem(item: any) {
    this.selectedItem = item;
    this.change.emit(this.selectedItem);
  }

  playSample(sample: Sample) {
    this.samplePlayer.playSample(sample, this.sampleVolume, 0);
  }

  handleItemBrowserBackButton() {
    switch (this.menuState) {
      case "subcategory":
        this.menuState = "category";
        break;
      case "patch":
        this.menuState = "subcategory";
        break;
      case "sample":
        this.menuState = "patch";
        break;
      default:
    }
  }

}
