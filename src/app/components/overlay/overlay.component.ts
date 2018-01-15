import {
  ChangeDetectorRef, Component, ElementRef, EventEmitter,
  HostListener, Inject, Input, OnInit, Output, QueryList,
  ViewChild, ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { OverlayOrigin} from '@angular/cdk/overlay';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/takeUntil';
import { debounce } from '../../lib/debounce';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})

export class OverlayComponent implements OnInit {
  @Input('isVisible') isOpen = false;
  @Input() overlayOrigin: OverlayOrigin;
  public overlayOriginEl;
  public enableFocus= false;

  @Output() close = new EventEmitter<any>();
  @Output() open = new EventEmitter<any>();
  /**
   * Pop up area
   */
  @ViewChild('dialog') dialog: ElementRef;

  destroy$ = new Subject<any>();
  constructor() {}
  ngOnInit() {
    this.overlayOriginEl = this.overlayOrigin.elementRef.nativeElement;
    /**
     * Observable for the input
     */
    const open$ = Observable.fromEvent<KeyboardEvent>(this.overlayOriginEl, 'keyup')
      .debounceTime(100)
      .filter(() =>  this.overlayOriginEl.value !== '' && !this.isOpen)
      .share();
    open$
      .takeUntil(this.destroy$)
      .subscribe(() => this.changeState(true));

    const setFocus$ = Observable.fromEvent<KeyboardEvent>(this.overlayOriginEl, 'keyup')
      .filter((e) => e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 38 || e.keyCode === 40)
      .filter(() => this.enableFocus === false )
      .do((data) => this.enableFocus = true )
      .share();
    setFocus$
      .takeUntil(this.destroy$)
      .subscribe(() => console.log('ddd'));
  }

  private changeState(isOpened: boolean) {
    this.isOpen = isOpened;

    console.log('open',  this.isOpen, 'enableFocus', this.enableFocus);
  }
  private isMovedOutside(overlayOriginEl, dialog, event): boolean {
      return !(overlayOriginEl.contains(event['target']) ||     this.dialog.nativeElement.contains(event['target']));
  }

  @HostListener('document:mousemove', ['$event'])
  @debounce()
  onMouseMove(event) {
    if ( this.overlayOriginEl ===  'undefined' || typeof this.dialog === 'undefined') return;
    if ( this.isMovedOutside(this.overlayOriginEl, this.dialog, event))
    this.changeState(false);
    // console.log(e);
  }

}
