import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { CourseService } from './../../services/course.service';
import { Course } from './../../models/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  data: Course[] = [];
  CourseModel = new Course();
  page = 1;
  pageSize = 5;
  collectionSize = 10;
  closeResult: string;
  creating: Boolean = true;

  constructor(private courseService: CourseService, private modalService: NgbModal) { }

  ngOnInit() {
    this.courseService.getCourses().subscribe(data => {
      console.log("data getCourses", data);
      this.data = data.map(e => {
        return { id: e.payload.doc.id, ...e.payload.doc.data() } as Course;
      })
      this.collectionSize = this.data.length;
    });
  }
  get courses(): Course[] {
    return this.data
      .map((course, i) => ({ index: i + 1, ...course }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  create() {
    console.log("create course", this.CourseModel);
    let newCourse: any;
    newCourse = Object.assign({}, this.CourseModel);
    this.courseService.createCourse(newCourse);
  }

  update() {
    let updateCourse: any;
    updateCourse = Object.assign({}, this.CourseModel);
    delete updateCourse.index;
    this.courseService.updateCourse(updateCourse);
  }

  delete(id: string) {
    console.log("delete", id);
    this.courseService.deleteCourse(id);
  }
  openUpdateCourse(content, course: Course) {
    this.creating = false;
    this.CourseModel = course;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  openNewCourse(content) {
    this.creating = true;
    this.CourseModel = new Course();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
