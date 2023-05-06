import { Component, EventEmitter, HostListener, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MenuSubjectService } from 'src/app/services/subject/menu-subject.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit ,OnChanges{
  openedChildiren: any[] = [];
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() openSettingMenu: EventEmitter<any> = new EventEmitter();


  menuClass:string= 'imgYonDegistirme';
  menu: any[] = [
  
    {
      icon: 'home', name: 'Ana Sayfa',url:'admin/',noChild:true
    },
    {
      icon: 'bookmarks', name: 'Etiketler',url:'/admin/etiket',  noChild:true
    },
   
    {
      icon: 'tune', name: 'Sınıflar',url:'/admin/sinif',noChild:true
    },
    {
      icon: 'event', name: 'Document',url:'/admin/document/list',noChild:true
    },
 
 
    


  ]
  filteredMenu: any[] = [];
  open: boolean = true;

  constructor(
    private localStorageService: LocalStorageService,
    private router:Router,
    private menuSubjectService:MenuSubjectService

    ) {



  }
  scrHeight: any;
  scrWidth: any;

  @HostListener('window:resize', ['$event'])
  
  getScreenSize() {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;

    if (this.scrWidth >= 768 && this.scrWidth < 1200) {
      this.close.emit("5.5rem")
      this.open = true
    }
    else if (this.scrWidth < 768) {
      this.open = false
      this.close.emit('0px')
    } else {
      if (!this.open) {
        this.open = true
        this.close.emit("14rem")
      }
    }
  //  this.LocalstorageService.add("width", window.innerWidth)
  }
  company_settings_modal:boolean = false;
  openModal() {
    this.company_settings_modal = true;
  }
  closeModal() {
    this.company_settings_modal = false
  }
  emitOpen() {

    if(!this.open && this.scrWidth < 768)
     {
      return  this.close.emit('0rem')
     } 
     else if(!this.open){

       this.close.emit('5.5rem')
     }

     else{
      this.close.emit('14rem')
     }
   // this.open ? this.close.emit('14rem') : this.close.emit('5.5rem')


  }
  screenSize() {
    //return this.LocalstorageService.get("width")
  }

  ngOnInit(): void {

    this.filteredMenu = this.menu;

    this.getScreenSize();



    this.getMenuOpen();
  }
  ngOnChanges(changes: SimpleChanges): void {

    console.log(' menu girdi',window.location)
    console.log(' menu girdichanges',changes)


    
  }

  getMenuOpen()
  {

    this.menuSubjectService.currentMenu.subscribe(res=>{
      if (this.openedChildiren.length > 0) {
        this.openedChildiren = []
      }
      if(res)
      {
        this.openedChildiren.push(res);
      }
    })

  }

  childrenStatus(index: number): void {
    
    const indexNumber = this.openedChildiren.indexOf(index);
    if (indexNumber !== -1) {
      this.openedChildiren.splice(indexNumber, 1)
    }
    else {
      if (this.openedChildiren.length > 0) {
        this.openedChildiren = []
      }
      this.openedChildiren.push(index)
    }
  }

  search(value = ''): void {
    // function checkChildrens(){

    // }
    let list: any[] = [];

    this.menu.forEach(element => {
      if (element.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0) {
        if (!list.includes(element))
          list.push(element)
      }
      element.children.forEach((child:any) => {
        if (child.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) >= 0) {
          if (!list.includes(element))
            list.push(element)        }
      });
    })
    this.filteredMenu = list;
  }


  rootLink(url:string)
  {
  
      this.router.navigate([url]);
    
  }

}

