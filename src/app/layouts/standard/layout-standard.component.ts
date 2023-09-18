import {Component, OnInit} from '@angular/core';
import {LayoutService} from "../../core/services/layout.service";
@Component({
  selector: 'eurekax-layout-standard',
  templateUrl: './layout-standard.component.html',
  styleUrls: ['./layout-standard.component.scss']
})
export class LayoutStandardComponent implements OnInit {
  layout = this.layoutService.layout;

  constructor(private layoutService: LayoutService) {
  }

  ngOnInit(): void {
  }

}
