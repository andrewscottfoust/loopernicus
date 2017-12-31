import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { Sample } from '../../models/Sample';
import { SamplesService } from '../../services/samples.service';

@Component({
  selector: 'app-sample-manager',
  templateUrl: './sample-manager.component.html',
  styleUrls: ['./sample-manager.component.css']
})
export class SampleManagerComponent implements OnInit {

  category: string = "";
  prefix: string = "";
  newSamplesArray: any[] = [""];
  samples:any;
  categories:any;
  subcategories:any;
  patches:any;
  sampleLibrary:any;
  newSamples:any;
  sampleFilters:any;
  fbMenuArray: any[] = [];
  menuArray: any[] = [];

  constructor(
    private samplesService: SamplesService,
    private http:Http
  ) {
    http.get('/assets/data/sample-library.json')
    .subscribe(response => {
      this.sampleLibrary = response.json();
    });

    http.get('/assets/data/new-samples.json')
    .subscribe(response => {
      this.newSamples = response.json();
    });

    http.get('/assets/data/sample-filters.json')
    .subscribe(response => {
      this.sampleFilters = response.json();
    });

    this.samplesService.getSamples().subscribe(samples => {
      this.samples = samples;
    });

    this.samplesService.getMenuArray().subscribe(menuData => {
      this.fbMenuArray = menuData;
      console.log(this.fbMenuArray);
    });
  }

  ngOnInit() {
  }

  rebuildSampleLibrary() {
    //clear old samples
    for(let p = 0; p < this.samples.length; p++) {
      this.samplesService.deleteSample(this.samples[p].key);
    }
    for(let i = 0; i < this.sampleLibrary.files.length; i++) {
      let sample = this.sampleLibrary.files[i];
      this.samplesService.addSample(sample);
    }
  }

  addNewSamplesToLibrary() {
    for(let i = 0; i < this.newSamples.files.length; i++) {
      let sample = this.newSamples.files[i];
      this.samplesService.addSample(sample);
    }
  }

  addNewSamples() {
    for(let i = 0; i < this.sampleLibrary.files.length; i++) {
      let sample = this.sampleLibrary.files[i];
      this.samplesService.addSample(sample);
    }
  }

  createMenuArray() {
    let categories: any[] = this.getCategories();
    for (let i = 0; i < categories.length; i++) {
      let obj: Object = {
        name: categories[i],
        subcategories: this.getSubcategories(categories[i])
      }
      this.menuArray.push(obj);
    }
    for(let i = 0; i < this.fbMenuArray.length; i++) {
      this.samplesService.deleteMenuItem(this.fbMenuArray[i].key);
    }
    for(let i = 0; i < this.menuArray.length; i++) {
      this.samplesService.addMenuItem(this.menuArray[i]);
    }
    
  }

  getCategories() {
    let categories: any[] = [];
    for (let i = 0; i < this.samples.length; i++) {
      categories.push(this.samples[i].category);
    }
    categories = this.getUnique(categories);
    return categories;
  }

  getSubcategories(category: string) {
    let subcategories: any[] = [];
    for (let i = 0; i < this.samples.length; i++) {
      if (this.samples[i].category == category) {
        let obj: Object = {
          name: this.samples[i].subcategory,
          patches: this.getPatches(category, this.samples[i].subcategory)
        }
        subcategories.push(obj);
      }
    }
    subcategories = this.getUnique(subcategories);
    return subcategories;
  }

  getPatches(category: string, subcategory: string) {
    let patches: any[] = [];
    for (let i = 0; i < this.samples.length; i++) {
      if (this.samples[i].category == category && this.samples[i].subcategory == subcategory) {
        patches.push(this.samples[i].patch);
      }
    }
    patches = this.getUnique(patches);
    return patches;
  }

  getUnique(arry: any[]) {
    let tmpArray: any[] = [];
    for (let i = 0; i < arry.length; i++) {
      let itemAlreadyInArray = false;
      for (let t = 0; t < tmpArray.length; t++) {
        if (JSON.stringify(arry[i]) == JSON.stringify(tmpArray[t])) {
          itemAlreadyInArray = true;
        }
      }
      if (itemAlreadyInArray == false) {
        tmpArray.push(arry[i]);
      }
    }
    return tmpArray;
  }

}
