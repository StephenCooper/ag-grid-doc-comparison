import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'child-cell',
  template: ` <div draggable="true" (dragstart)="onDragStart($event)">
    Drag Me!
  </div>`,
})
export class DragSourceRenderer implements ICellRendererAngularComp {
  public params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  onDragStart(dragEvent: DragEvent) {
    var userAgent = window.navigator.userAgent;
    dragEvent.dataTransfer!.setData(
      'text/plain',
      'Dragged item with ID: ' + this.params.node.data.id
    );
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
