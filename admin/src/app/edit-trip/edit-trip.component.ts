import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TripDataService, Trip } from '../services/trip-data/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  editForm!: FormGroup;
  tripCode!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tripService: TripDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tripCode = this.route.snapshot.paramMap.get('code')!;
    this.editForm = this.fb.group({
      code: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.tripService.getTrip(this.tripCode).subscribe({
      next: (trip: Trip) => {
        this.editForm.patchValue({
          code: trip.code,
          name: trip.name,
          length: trip.length,
          start: trip.start,
          resort: trip.resort,
          perPerson: trip.perPerson,
          image: trip.image,
          description: trip.description.replace(/<[^>]*>?/gm, '')
        });
      },
      error: (err) => console.error('Trip load error:', err)
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.tripService.updateTrip(this.tripCode, this.editForm.value).subscribe({
        next: () => {
          console.log('Trip updated');
          this.router.navigate(['/trips']);
        },
        error: (err) => {
          console.error('Update error:', err);
        }
      });
    }
  }
}
