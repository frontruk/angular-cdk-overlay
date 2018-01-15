import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColorOptionsDirective } from './directives/coloroptions.directive';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';

export interface autoCompleteList {
  name: string;
  subtitle: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  isDestinationVisible;

  constructor(private fb: FormBuilder){}
  @ViewChild('destinationRef') destinationRef: ElementRef;
  public autoCompleteSource: autoCompleteList[] = [
    {
      name: 'James',
      subtitle: 'Designer',
    },
    {
      name: 'Harry',
      subtitle: 'Chef',
    },
    {
      name: 'DDDD',
      subtitle: 'CEO',
    },
    {
      name: 'AAAA',
      subtitle: 'Sales',
    }
  ];

  form: FormGroup;
  ngOnInit(){
    this.form = this.fb.group({
      colorpicker: ['', Validators.required ],
      destination:  ['', Validators.required ],
      departure:  ['', Validators.required ],
    });
  }

  /**
   * Autocomplete
   */
  selectedItem(item: autoCompleteList){
    this.form.get('destination').setValue(item);
    this.destinationRef.nativeElement.value = item.name;
  }

  /**
   * This is native overlay to allows keyboard up/down
   */
  @ViewChildren(ColorOptionsDirective) options: QueryList<ColorOptionsDirective>;
  keyManager: ActiveDescendantKeyManager<ColorOptionsDirective>;

  ngAfterViewInit(){
    this.keyManager = new ActiveDescendantKeyManager(this.options);
  }
  keydownHandler(event: KeyboardEvent){
    this.keyManager.onKeydown(event);
  }

}
