import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Action } from 'rxjs/internal/scheduler/Action';

export interface Columns{
  prop: string,
  value: string
}
export interface TableAction {
  label?: string;
  icon?: string;
  cssClass?: string;
  code: string;
  tooltip?:{label: string, cssClass: string};
}
@Component({
  selector: 'eurekax-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  elements: any[] = [];
  cols: Columns[] = [];
  @Input() actions: TableAction[] = []
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
  @Input() limit: number = 15;
  @Input() hover: boolean = false;
  @Input() zebra: boolean = false;
  @Input() stickyheader: boolean = false;
  @Input() set rows(data: any[]) {
    this.elements = data ?? [];
  }

  @Input() set columns(data: Columns[]) {
    this.cols = data ?? [];
  }
  @Output() fireAction: EventEmitter<{row: any,actionCode: string}> = new EventEmitter<{row: any,actionCode: string}>();
  @Output() nextSearch: EventEmitter<null> = new EventEmitter<null>();
  selected: any[] = [];

  createCols(object: any) {
    const cols: { name: string }[] = [];
    const propertyNames: string[] = Object.keys(object);
    propertyNames.forEach((propertyName) => {
      cols.push({ name: propertyName });
    });
    return cols;
  }

  onSelect(event: any) {
    console.log('Event: select', event, this.selected);
  }

  emitAction(row: any, actionCode: string){
    this.fireAction.emit({
      actionCode,
      row
    });
  }

  protected readonly Array = Array;
}
