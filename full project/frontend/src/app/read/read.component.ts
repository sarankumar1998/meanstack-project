import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service'

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private service: ApiserviceService) { }
  readData: any;
  successmsg: any;

  ngOnInit(): void {
this.getAllData(id);
  }
  // Delete the data by id
  deleteID(id: any) {
    console.log(id, 'Deleteid==>');
    this.service.deleteData(id).subscribe((res) => {
      console.log(res, 'deleteid==>');
      this.successmsg = res.message
      this.getAllData(id);

    });
  }
  // get data

  getAllData(id:any) {
    this.service.getAllData().subscribe((res) => {
      console.log(res, 'res==>');
      // below that code is used for to clean the all values in input box
      this.readData = res.data;
    });
  }
// here i change getall data from getsingle data

}
function id(id: any) {
  throw new Error('Function not implemented.');
}

