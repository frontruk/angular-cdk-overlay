import { Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { ColorOptionsDirective } from '../../directives/coloroptions.directive';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit, OnChanges {
  private filteredList: any[] = [];
  @Input('source') source: any;
  @Input('inputRef') HTMLElement;

  @Input('no-match-found-text') noMatchFoundText: string;

  constructor() {
  }

  something(){
      alert('testing')
  }
  ngOnInit() {
    console.log('source', this.source);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes)

  }

//   @ViewChildren(ColorOptionsDirective) options: QueryList<ColorOptionsDirective>;
//   keyManager: ActiveDescendantKeyManager<ColorOptionsDirective>;
//
//   ngAfterViewInit(){
//     this.keyManager = new ActiveDescendantKeyManager(this.options);
//   }
//   keydownHandler(event: KeyboardEvent){
//     this.keyManager.onKeydown(event);
//   }
// }
}
