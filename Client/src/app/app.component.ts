import { Component, OnInit } from '@angular/core';
import { MenuConfigService } from './core/services/menu-config.service';
import { MenuConfig } from './core/config/menu.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'as-Angular';

  /**
   *
   */
  constructor(private menuConfigService:MenuConfigService) {



  }
  ngOnInit(): void {
		this.menuConfigService.loadConfigs(new MenuConfig().configs);

  }



}
