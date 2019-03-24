import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course } from './../models/course.model';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private firestore: AngularFirestore) { }

  getCourses() {
    return this.firestore.collection('courses').snapshotChanges();
  }
  createCourse(course: Course){
    return this.firestore.collection('courses').add(course);
  }
  updateCourse(course: Course){
    console.log("updateCourse", course);
    this.firestore.doc('courses/' + course.id).update(course);
  }
  deleteCourse(courseId: string){
    this.firestore.doc('courses/' + courseId).delete();
  }
}
