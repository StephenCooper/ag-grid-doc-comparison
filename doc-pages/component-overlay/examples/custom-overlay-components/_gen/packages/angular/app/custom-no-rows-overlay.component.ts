import { Component } from '@angular/core';
import { INoRowsOverlayAngularComp } from 'ag-grid-angular';
import { INoRowsOverlayParams } from 'ag-grid-community';

@Component({
  selector: 'app-no-rows-overlay',
  template: ` <div
    class="ag-overlay-loading-center"
    style="background-color: lightcoral;"
  >
    <i class="far fa-frown"> {{ params.noRowsMessageFunc() }} </i>
  </div>`,
})
export class CustomNoRowsOverlay implements INoRowsOverlayAngularComp {
  public params!: INoRowsOverlayParams & { noRowsMessageFunc: () => string };

  agInit(
    params: INoRowsOverlayParams & { noRowsMessageFunc: () => string }
  ): void {
    this.params = params;
  }
}
