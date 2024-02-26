import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDroprown]',
})
export class DropdownDirective {
  // Mi solution
  /* constructor(private elementRef: ElementRef, private rendeded: Renderer2) {}

  @HostListener('click') toogleOpen() {
    if (this.elementRef.nativeElement.className.includes('open')) {
      this.rendeded.removeClass(this.elementRef.nativeElement, 'open');
    } else {
      this.rendeded.addClass(this.elementRef.nativeElement, 'open');
    }
  } */

  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
