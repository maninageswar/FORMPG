import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup ,FormControl,Validators} from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  dropdownList:any = [];
  selectedItems:string[] = [];
  dropdownSettings:IDropdownSettings={};
  subitted:boolean=false
  floor:number=0;
  totalFloors:number[] = []
  main:any[]=[]
  floor_name:string=''
  l:string=''
  formitem:any

  ngOnInit() {
    this.dropdownList = [
      // { item_id: 1, item_text: '1_sharing' },
      // { item_id: 2, item_text: '2_sharing' },
      // { item_id: 3, item_text: '3_sharing' },
      // { item_id: 4, item_text: '4_sharing' },
      // { item_id: 5, item_text: '5_sharing' }
      'sharing1','sharing2','sharing3','sharing4','sharing5'
    ];
    this.dropdownSettings= {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    if (this.selectedItems.length+1 >0){
      this.pgform.controls.pg_details.get('no_of_floors')?.enable();
    }
    this.selectedItems.push(item)
    this.selectedItems.sort((a,b) =>  (a > b ? 1 : -1))
  }

  onItemDeSelect(item: any){
    if (this.selectedItems.length <2){
      this.pgform.controls.pg_details.get('no_of_floors')?.disable();
    }
    this.selectedItems=this.selectedItems.filter(value => value !== item)
  }
  onSelectAll(items: any) {
    this.pgform.controls.pg_details.get('no_of_floors')?.enable();
    this.selectedItems=items
  }

  onItemDeSelectAll(items: any){
    this.pgform.controls.pg_details.get('no_of_floors')?.disable();
    this.selectedItems=items
  }

  title = 'PGFORM';
  integerRegex= /^\d+$/
  emailRegex='[a-z0-9]+@[a-z]+\.[a-z]{2,3}'


  pgform = new FormGroup({
    owner_details: new FormGroup({
      name: new FormControl(null, [Validators.maxLength(20),Validators.minLength(5), Validators.required]),
      phone: new FormControl(null, [Validators.maxLength(10),Validators.minLength(10), Validators.required, Validators.pattern(this.integerRegex)]),
      email: new FormControl(null, [Validators.pattern(this.emailRegex)]),
    }),

    pg_details: new FormGroup({
      pg_name: new FormControl(null, [Validators.maxLength(20),Validators.minLength(5), Validators.required]),
      pg_location: new FormControl(null, [Validators.required]),
      pg_deposite: new FormControl(null, [Validators.required, Validators.pattern(this.integerRegex)]),
      pg_type: new FormControl(null, [Validators.required]),
      pg_room_types: new FormControl(null, [Validators.required]),
      no_of_floors: new FormControl({value: '', disabled: true}, [Validators.required, Validators.pattern(this.integerRegex)]),
      pg_room_type_rents: new FormGroup({
        sharing1: new FormControl(null, [Validators.required, Validators.pattern(this.integerRegex)]),
        sharing2: new FormControl(null, [Validators.required, Validators.pattern(this.integerRegex)]),
        sharing3: new FormControl(null, [Validators.required, Validators.pattern(this.integerRegex)]),
        sharing4: new FormControl(null, [Validators.required, Validators.pattern(this.integerRegex)]),
        sharing5: new FormControl(null, [Validators.required, Validators.pattern(this.integerRegex)]),
      }),
      room_types_in_eachfloors: new FormGroup({

      })
    })
  })

  showForm(){
    console.log(this.pgform)
    // this.subitted=true
    console.log("pgform_value")
    console.log(this.pgform.value)
  }
  createFloors(e:any){
    this.totalFloors=[]
    this.floor=Number(e.value);
    console.log(typeof e.value);
    this.formitem=this.pgform.controls.pg_details.get('room_types_in_eachfloors')
    for (let i=1;i<this.floor+1;i++){ //floor
      this.totalFloors.push(i);
      this.floor_name='floor'+i.toString()
      this.formitem.controls[this.floor_name]=new FormGroup({})
      for (let k in this.selectedItems){

        // this.l=this.floor_name+this.selectedItems[k]
        // console.log(this.l)
        this.formitem.controls[this.floor_name].controls[this.selectedItems[k]]=new FormControl(null, [Validators.required])
        // this.formitem.controls[this.l]=new FormControl(null, [Validators.required])
      }
    }
    console.log(this.formitem.controls)
    // console.log(this.selectedItems)
    // console.log("end")
  }

}







