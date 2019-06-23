import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[remove-host]'
})
export class RemoveHostDirective implements OnInit {
  constructor(private el: ElementRef) {
  }
  // wait for the component to render completely
  ngOnInit() {
    const nativeElement: HTMLElement = this.el.nativeElement;
    const parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element
    parentElement.removeChild(nativeElement);
  }
}
