import { Component, OnInit } from '@angular/core';
import { FlickrService } from '../flickr.service';
import { Photo } from '../domainModel/photoList.domain';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  photo: Photo;
  photoInfo: any;
  title: string;
  description: string;
  form: FormGroup;
  isRated = false;
  ratingArr = [];
  showloader: boolean;

  constructor(
    private flickrService: FlickrService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
      this.photo = this.flickrService.photo;
      this.ratingArr = this.flickrService.ratingArray();
      this.getInfo();
      this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      provider: ['', Validators.required],
      reason: ['', Validators.required],
      rating: [null, Validators.required]
    });
  }

  getInfo() {
    this.showloader = true;
    if (this.photo) {
      this.flickrService.getInfo(this.photo.id).subscribe(res => {
        console.log('res', res);
        this.photoInfo = res.photo;
        this.title = res.photo.title._content === '' ? 'Picture' : res.photo.title._content ;
        this.description = res.photo.description._content === '' ? 'Description not available' : res.photo.description._content;
        this.showloader = false;
      });
    }
  }

  getPhoto(): string {
    return this.flickrService.getPhoto(this.photo);
  }

  changeRating(selectedRating) {
    this.form.get('rating').patchValue(selectedRating.value);
    this.ratingArr.forEach(elt => elt.value <= selectedRating.value ? elt.isClicked = true : elt.isClicked = false);
  }

  submit(form: FormGroup) {
   if (form.valid) {
    const ratedArr =  {
      id: this.photo.id,
      rating: this.ratingArr
    };
    this.flickrService.ratedImg.next(ratedArr);
    this.router.navigate(['']);
   }
  }

}
