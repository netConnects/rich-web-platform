import { Component, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { IView } from '../modal/interface/i-view';
import { IDivider, IPanel } from '../modal/interface/interface';
@Component({
  selector: 'bb-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit, IPanel {
  @Input() directions: string[] = [];
  @Input() rFlex = false;
  @Input() id = '';
  @Input() isView = false;
  @Input() isChanging = { state: false };
  @Input() parent!: IPanel;
  @Input() divider?: IDivider;

  @HostBinding('class') class?: any;
  @HostBinding('style') style?: any = {};
  @HostBinding('style.width') width: any;
  @HostBinding('style.transition') transition: any = '';
  @HostBinding('style.height') height: any;
  @HostBinding('style.flex-basis') flexBasis: string;
  @HostBinding('style.flex-direction') flexDirection = 'row';
  @Input() @HostBinding('style.background-color') bgColor: '';
  flexBasisOld = '';
  isFullscreen = false;
  children: IPanel[] = [];
  nativeElement: any;
  views: IView[] = [];
  name = '';
  binding = { closed: false, overlay: false };

  getOffsetWidth(): number { return this.nativeElement.offsetWidth; }
  getOffsetHeight(): number { return this.nativeElement.offsetHeight; }
  getScrollWidth(): number { return this.nativeElement.scrollWidth; }
  getScrollHeight(): number { return this.nativeElement.scrollHeight; }
  getOffsetTop(): number { return this.nativeElement.offsetTop; }
  getOffsetLeft(): number { return this.nativeElement.offsetLeft; }


  constructor(public renderer: Renderer2, private regionElement: ElementRef) {
    this.nativeElement = this.regionElement.nativeElement;
  }
  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent): void {
    this.setFullscreen(false);
  }

  setFullscreen(fullscreen: boolean): void {
    this.isFullscreen = fullscreen;
    if (fullscreen) {
      this.renderer.addClass(this.regionElement.nativeElement, 'fullscreen');
    } else {
      this.renderer.removeClass(this.regionElement.nativeElement, 'fullscreen');
    }
  }
  ngOnInit(): void {
    this.flexBasis = 'flexBasis' in this.nativeElement.style ? 'flexBasis' :
      'webkitFlexBasis' in this.nativeElement.style ? 'webkitFlexBasis' :
        'msFlexPreferredSize' in this.nativeElement.style ? 'msFlexPreferredSize' : 'flexBasis';
    if (this.parent) {
      this.parent.children.push(this);
    }
    this.flexBasisOld = this.flexBasis;
    this.style.display = 'flex!important';
    this.style.flexWrap = 'nowrap !important';
    this.style.overflow = 'hidden !important';
    this.style.width = '100% !important';
    this.style.transition = 'none !important';
    this.style.height = '100% !important';
    this.style.padding = '0 !important';
    this.style.margin = '0 !important';
    this.style.flex = '1 1 !important; ';

  }


  close(): void {
    this.binding.closed = !this.binding.closed;
    if (this.binding.closed) {
      this.renderer.addClass(this.nativeElement, 'closed');
    } else {
      this.renderer.removeClass(this.nativeElement, 'closed');
    }
    let isAllClosed = true;
    let lastKey = '';
    if (this.parent) {
      this.parent.children.forEach(child => {
        isAllClosed &&= child.binding.closed;
        if (this.id !== child.id && !this.binding.closed) {
          lastKey = child.id;
        }
      });

      if (isAllClosed) {
        this.parent.close();
        this.parent.class = this.class.closed = true;
      } else {
        this.parent.class.closed = false;
      }

    }

  }

}
