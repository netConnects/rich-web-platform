import { Directive, ElementRef, Input, OnInit } from '@angular/core';
@Directive({
  selector: '[removeWrapper]'
})
export class RemoveWrapperDirective implements OnInit {
  constructor(private el: ElementRef) {

  }
  @Input() removeWrapper = false;
  @Input() compact = false;
  ngOnInit(): void {
    const element = this.el.nativeElement;
    const parentElement = element.parentElement;
    if (parentElement && this.removeWrapper) {
      parentElement.removeChild(element);
      element.className = element.className + ' p-0 m-0 ';
      if (this.compact && parentElement.previousSibling) {
        parentElement.previousSibling.append(element);
      } else {
        parentElement.parentNode.insertBefore(element, parentElement.nextSibling);
      }
      parentElement.parentNode.removeChild(parentElement);
    }
  }
}
