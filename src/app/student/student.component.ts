import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { studentdata } from './datamodel';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
showadd! :boolean
showupdate!:boolean
studentmodelobj : studentdata = new studentdata
formvalue! :FormGroup
allstudentdata :any


constructor(private formBuilder:FormBuilder , private api : ApiService){}

ngOnInit(){
  this.formvalue =  this.formBuilder.group({
    
    name:['',Validators.required],
    email:['',Validators.required],
    mobile:['',Validators.required],
    city:['',Validators.required],
    pincode:['',Validators.required],
  })
  this.getdata()
}

  add(){
    this.showadd=true
    this.showupdate=false
  }


  edit(data:any){
    this.showadd =false
    this.showupdate =true
    this.studentmodelobj.id = data.id
    this.formvalue.controls['name'].setValue(data.name)
    this.formvalue.controls['email'].setValue(data.email)
    this.formvalue.controls['mobile'].setValue(data.mobile)
    this.formvalue.controls['city'].setValue(data.city)
    this.formvalue.controls['pincode'].setValue(data.pincode)
  }
//update on edit
update(){
  this.studentmodelobj.name = this.formvalue.value.name;
    this.studentmodelobj.email = this.formvalue.value.email;
    this.studentmodelobj.mobile = this.formvalue.value.mobile;
    this.studentmodelobj.city = this.formvalue.value.city;
    this.studentmodelobj.pincode = this.formvalue.value.pincode;

    this.api.updatestudent(this.studentmodelobj, this.studentmodelobj.id).subscribe(res=>{
      this.formvalue.reset()
      this.getdata()
      alert("Record update successfully")
    })
}

  addstudent(){
    this.studentmodelobj.name = this.formvalue.value.name;
    this.studentmodelobj.email = this.formvalue.value.email;
    this.studentmodelobj.mobile = this.formvalue.value.mobile;
    this.studentmodelobj.city = this.formvalue.value.city;
    this.studentmodelobj.pincode = this.formvalue.value.pincode;

    this.api.poststudent(this.studentmodelobj).subscribe(res=>{
      // console.log(res)
      this.formvalue.reset()
      this.getdata()
      alert("Record added successfully")
    })
    
  }
//getdata

getdata(){
  this.api.getstudent().subscribe(res=>{
    this.allstudentdata = res
  })
}

//delete
deletestud(data:any){
  if(confirm("Are You sure to delete?"))
  this.api.deletestudent(data.id).subscribe(res=>{
    alert("Deleted successfully")
    this.getdata()
  })
}


}
