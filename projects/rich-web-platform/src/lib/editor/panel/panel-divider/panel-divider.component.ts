import { AfterViewInit, Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { IDivider, IPanel } from '../../modal/interface/interface';


@Component({
  selector: 'bb-panel-divider',
  templateUrl: './panel-divider.component.html',
  styleUrls: ['./panel-divider.component.scss']
})
export class PanelDividerComponent implements OnInit, AfterViewInit, IDivider {

  @Input() axis = '';
  @Input() parent?: IPanel;
  @Input() id = '';

  constructor() {
  }

  @HostBinding('style.width') width: any = '';
  @HostBinding('style.height') height: any = '';
  @HostBinding('style.transition') transition: any = '';
  @HostBinding('style.flex-basis') flexBasis: any;
  @HostBinding('style.background') color = 'var(--background-secondary)';
  binding = { overlay: false };
  private isDragging = false;

  ngAfterViewInit(): void {
    if (this.axis === 'x') {
      this.parent.flexDirection = 'column';
    }

  }

  ngOnInit(): void {
    if (this.parent && !this.parent.parent && this.parent.children.length > 0) {
      this.fixTransition(this.parent, false);
      this.handleDragging(this.parent, this.axis, 0, true);
      this.fixTransition(this.parent, true);
    }

    this.width = this.axis === 'x' ? '100%' : '5px';
    this.height = this.axis === 'x' ? '5px' : '100%';
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(mouseEvent: MouseEvent): void {
    // start
    if (mouseEvent.which === 1 && this.parent?.children) {
      this.isDragging = true;
      this.fixTransition(this.parent, false);
      this.binding.overlay = true;
    }

  }

  private getMouseOffset(mouseEvent: MouseEvent, parent: IPanel): number {
    const panelY = mouseEvent.clientY - parent.getOffsetTop();
    const panelX = mouseEvent.clientX - parent.getOffsetLeft();
    const offset =
      this.axis === 'x' ?
        parent.getOffsetHeight() - (parent.getOffsetHeight() - panelY) :
        parent.getOffsetWidth() - (parent.getOffsetWidth() - panelX);
    return offset;
  }

  private fixTransition(parent: IPanel, unsetValue: boolean): void {
    if (unsetValue) {
      this.transition = 'none!important';
      parent.transition = 'none!important';
    } else {
      parent.transition = '';
      this.transition = '';
    }
    parent.children.forEach(child => {
      if (unsetValue) {
        child.transition = 'none!important';
      } else {
        child.transition = '';
      }
      this.fixTransition(child, unsetValue);
    });
  }

  @HostListener('document:mousemove', ['$event'])
  onMousemove(event: MouseEvent): void {
    if (this.isDragging && this.parent) {
      const offset = this.getMouseOffset(event, this.parent);
      this.handleDragging(this.parent, this.axis, offset, false);
    }
  }

  handleDragging(parent: IPanel, axis: string, offset: number, eventBubble: boolean): void {
    let tLength = (this.axis === 'x') ? parent.getOffsetHeight() : parent.getOffsetWidth();
    if (eventBubble) {
      // console.log('tL=====>  ' + tLength);
    }
    let isLeft = true;
    parent.children.forEach(child => {
      ({ isLeft, tLength } = this.handleResize(isLeft, offset, tLength, child, eventBubble));
      if (child.divider) {
        child.divider.handleDragging(child, child.divider.axis, offset, true);
      }
    });
  }

  private handleResize(isLeft: boolean, offset: number, tLength: any, child: IPanel, eventBubble: boolean)
    : { isLeft: boolean, tLength: number } {
    if (isLeft) {
      offset = this.offset(eventBubble, offset, child);
      if (offset < tLength) {
        child.flexBasis = offset + 'px';
        tLength = tLength - offset;
      } else {
        child.flexBasis = tLength + 'px';
        tLength = 0;
      }
      isLeft = false;
    } else {
      child.flexBasis = tLength + 'px';
    }
    return { isLeft, tLength };
  }

  private offset(eventBubble: boolean, offset: number, child: IPanel): number {
    if (eventBubble) {
      const length = child.flexBasis.substr(0, child.flexBasis.length - 2);
      try {
        offset = (Number(length));
        if (!offset) {
          offset = (this.axis === 'x' ? child.getScrollHeight() : child.getScrollWidth()) + 2;
        }
      } catch
      {
        offset = (this.axis === 'x' ? child.getScrollHeight() : child.getScrollWidth()) + 2;
      }
    }
    if ('divider2q' === this.id) {
      //  console.log('offset: -> ' + offset);
    }

    return offset;
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseup(event: MouseEvent): void {
    // End
    this.isDragging = false;
    if (this.parent) {
      this.fixTransition(this.parent, false);
      this.binding.overlay = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    if (this.parent && !this.parent.parent && this.parent.children.length > 0) {
      this.handleDragging(this.parent, this.axis, 0, true);
    }
  }
}
