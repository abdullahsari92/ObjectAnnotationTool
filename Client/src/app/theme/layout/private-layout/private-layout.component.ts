import { trigger, state, style, transition, animate } from '@angular/animations';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenModel } from 'src/app/Model/tokenModel';
import { TutoriolModel } from 'src/app/Model/tutoriolModel';
import { MenuConfig } from 'src/app/core/config/menu.config';
import { MenuConfigService } from 'src/app/core/services/menu-config.service';
import { AsSettingsService } from 'src/app/services/as-settings.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MenuSubjectService } from 'src/app/services/subject/menu-subject.service';

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({     
        opacity: 1, 
        // height:'auto',
        overflow:'display'
      })),
      state('closed', style({
        opacity: 0,   
        height:'0'  ,
        overflow:'hidden'
      })),
      transition('open => closed', [
       
      ]),
      transition('closed => open', [
        animate('0.7s')
      ]),
    ]),
  ],
  // encapsulation: ViewEncapsulation.None
})
export class PrivateLayoutComponent implements  OnInit {
  searchText: string = "";
    istutoriol = false;
  headerMobilOpen:boolean=false;
  languages: LanguageFlag[] = [
    {
      lang: 'en',
      name: 'English',
      flag: '../../../../assets/svg/260-united-kingdom.svg'
    },
    {
      lang: 'tr',
      name: 'Turkey',
      flag: '../../../../assets/svg/218-turkey.svg'
    },
    {
      lang: 'fr',
      name: 'French',
      flag: '../../../../assets/svg/195-france.svg'
    },
    {
      lang: 'de',
      name: 'German',
      flag: '../../../../assets/svg/162-germany.svg'
    },
  ];


  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  appPadding: string = "14rem";
  isActiveSearch=false;
  companyList: any[] = [];
  tokenModel: TokenModel = new TokenModel();
  activeLanguage: any;
  isSearch = false;
 // @ViewChild('notification') elNotification!: ElementRef;
  @ViewChild('elementLang') elLanguages: any;
  //@ViewChild('elementContact') elContact: any;
  @ViewChild('elementSearch') elSearch: any;
  @ViewChild('elementFooter') elFooter: any;
  @ViewChild('elementProfile') elProfile: any;


  
  isNotification=false;

  tutoriolModel: TutoriolModel[] = [];
  constructor(private localStorageService: LocalStorageService,
  
    private router: Router,
    public asSettingsService: AsSettingsService,
    private menuSubjectService:MenuSubjectService,


  ) {

 }


  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  ngOnInit(): void {


    //this.getTokenModel();

    this.activeLanguage = this.languages.find(p => p.lang == 'tr')
   
}




  menuActive(index:any)
  {
    this.menuSubjectService.menuDegistir(index);
  }

 


  searchClose() {
    this.isSearch = false

    this.searchText = "";
  }
  search() {

    
  }
  getYetkiliSirket() {

    
  }


  

 
  basHarfLogo(username: string) {
    if (!username) return "";

    var name = username.split(" ");
    var nameHarf = name[0] ? name[0].substr(0, 1).toUpperCase() : "";
    var surnameHarf = name[1] ? name[1].substr(0, 1).toUpperCase() : "";
    return nameHarf + surnameHarf
  }



  getSettingMenu()
  {

      this.router.navigateByUrl('/');
    

  }
}
