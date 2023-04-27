// Angular
import { Injectable } from '@angular/core';
// RxJS
import { BehaviorSubject } from 'rxjs';
// Object path
// Services
import { MenuConfigService } from './menu-config.service';

@Injectable()
export class MenuHorizontalService {
	// Public properties
	menuList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	/**
	 * Service constructor
	 *
	 * @param menuConfigService: MenuConfigService
	 */
	constructor(private menuConfigService: MenuConfigService) {
		this.loadMenu();
	}

	/**
	 * Load menu list
	 */
	loadMenu() {
		// get menu list

		console.log('this.menuConfigService.getMenus() ',this.menuConfigService.getMenus())
		const menuItems: any[] = this.menuConfigService.getMenus().header.items;
		this.menuList$.next(menuItems);
	}
}
