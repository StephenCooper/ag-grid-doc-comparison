import { IStatusPanelAngularComp } from "@ag-grid-community/angular";
import { IStatusPanelParams } from "@ag-grid-community/core";
import { Component } from "@angular/core";

@Component({
  selector: "status-component",
  template: `<input
    type="button"
    (click)="onClick()"
    value="Click Me For Selected Row Count"
  />`,
  styles: ["input { padding: 5px; margin: 5px }"],
})
export class ClickableStatusBarComponent implements IStatusPanelAngularComp {
  private params!: IStatusPanelParams;

  agInit(params: IStatusPanelParams): void {
    this.params = params;
  }

  onClick(): void {
    alert("Selected Row Count: " + this.params.api.getSelectedRows().length);
  }
}
