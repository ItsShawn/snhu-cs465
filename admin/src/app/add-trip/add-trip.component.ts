import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripDataService } from '../services/trip-data/trip-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent {
  addForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private tripService: TripDataService,
    private router: Router
  ) {
    this.addForm = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get f() {
    return this.addForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.addForm.valid) {
      const formData = this.addForm.value;

      const trip = {
        ...formData,
        start: new Date(formData.start)
      };

      this.tripService.addTrip(trip).subscribe({
        next: (value) => {
          console.log('Trip added:', value);
          this.router.navigate(['/trips']);
        },
        error: (err) => {
          console.error('Error adding trip:', err);
        }
      });
    }
  }
}

