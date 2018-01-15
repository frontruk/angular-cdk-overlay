import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ColorOptionsDirective } from '../../directives/coloroptions.directive';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';

@Component({
  selector: 'app-colorpicker',
  templateUrl: './colorpicker.component.html',
  styleUrls: ['./colorpicker.component.scss']
})
export class ColorpickerComponent implements OnInit {
  selectedColor: string;
  colors = [
    {hex: '#000', name: 'Black'},
    {hex: '#00F', name: 'Red'},
    {hex: '#0EE', name: 'Black'},
    {hex: '#0F0', name: 'Black'},
    {hex: '#FF0', name: 'Black'},
    {hex: '#0FF', name: 'Black'},
    {hex: '#0E2', name: 'GREEN'},
    {hex: '#D00', name: 'RED'},
  ];
  constructor() { }
  ngOnInit() {}
  @ViewChildren(ColorOptionsDirective) options: QueryList<ColorOptionsDirective>;
  keyManager: ActiveDescendantKeyManager<ColorOptionsDirective>;

  ngAfterViewInit(){
    this.keyManager = new ActiveDescendantKeyManager(this.options);
  }
  keydownHandler(event: KeyboardEvent){
    this.keyManager.onKeydown(event);
  }
}
