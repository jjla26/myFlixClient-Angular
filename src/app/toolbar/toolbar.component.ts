import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

/**
 * Toolbar component to render the navigation bar
 */
export class ToolbarComponent implements OnInit {
  @Input() user: string = ''
  
  constructor() { }

  ngOnInit(): void {
  }

}
