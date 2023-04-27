

export class  TokenModel{
 
   token:string="";
   company:Company = new Company();
   user:User = new User();
   error:any;

   result:boolean | undefined;
}

export class  Company{

}

export class  User{

   company_name!: string;
   country_iso_code_2!: string;
   email1!: string;
   email1_type_uid!: string;
   email2!: string;
   email2_type_uid!: string;
   email3!: string;
   email3_type_uid!: string;
   language!: string;
   name: string ="abdullah sarı";
   notes!: [];
   phone1!: string;
   phone1_type_uid!: string;
   phone2!: string;
   phone2_type_uid!: string;
   phone3!: string;
   phone3_type_uid!: string;
   position!: string;
   profile_photo_file_uid!:string;
   role!: string;
   sector_uid!: string;
   tags!: [];
   uid!: string;

}