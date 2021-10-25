import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  errormsg: any
  successmsg: any
  getparamid: any;
  userForm: any

  constructor(private service: ApiserviceService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    // get the value from read components from create components and we done page router method, if click the update btn its go to directly create page..
    this.getparamid = this.router.snapshot.paramMap.get('id')
    if (this.getparamid) {
      this.service.getSingleData(this.getparamid).subscribe((res) => {
        console.log(res, "res ==>");
        this.userForm.patchValue({
          'name': res.data[0].name,
          'email': res.data[0].email,
          'mobile': res.data[0].mobile
        })
      })
    }

    //  form validators
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required])
    });
  }

  // create new user
  userSubmit() {

    if (this.userForm.valid) {
      console.log(this.userForm.value);
      this.service.CreateData(this.userForm.value).subscribe((res) => {
        console.log(res, "res==>");
        this.userForm.reset();
        this.successmsg = res.message


      })

    }
    else {
      this.errormsg = "all fields are required"
      console.log(this.errormsg);


    }
  }

  userUpdate() {
    console.log(this.userForm.value, 'updateform');

    if (this.userForm.valid) {

      this.service.updateData(this.userForm.value, this.getparamid).subscribe((res) => {

        console.log(res, 'resupdated==>');
        this.successmsg = res.message

      })
    }
    else {
      this.errormsg = "all fields are required"
    }

  }

}