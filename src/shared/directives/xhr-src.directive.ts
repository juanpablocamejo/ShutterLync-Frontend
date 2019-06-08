import { Directive, Renderer2, ElementRef, Input, OnChanges, HostBinding, Output } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Directive({
  selector: '[appXhrSrc]'
})
export class XhrSrcDirective implements OnChanges {
  private src$: BehaviorSubject<any>;
  private dataUrl$: Observable<any>;
  @Input('appXhrSrc') xhrsrc: string;
  @HostBinding('src') src: string;

  constructor(private elem: ElementRef,
              private renderer: Renderer2,
              private httpClient: HttpClient,
              private domSanitizer: DomSanitizer) {
    this.src$ = new BehaviorSubject<any>(this.xhrsrc);
    this.src$
      .pipe(switchMap(url => url ? this.loadImage(url) : of('./assets/img.jpg')))
      .subscribe((src) => this.updateSrc(src));
  }

  ngOnChanges(): void {
    this.src$.next(this.xhrsrc);
  }

  private loadImage(url: string): Observable<any> {
    return this.httpClient
      // load the image as a blob
      .get(url, { responseType: 'blob' })
      // create an object url of that blob that we can use in the src attribute
      .pipe(
        map(e => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e)))
      );
  }

  updateSrc(val) {
    this.src = val;
  }


}
