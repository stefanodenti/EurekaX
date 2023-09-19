import {Component, Input, OnInit} from '@angular/core';
import {Footer} from "../../models/config.model";
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'eurekax-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() config: Footer | null = null;
  year = new Date().getFullYear();
  constructor( public themeService: ThemeService,) { }

  ngOnInit(): void {
  }

}
