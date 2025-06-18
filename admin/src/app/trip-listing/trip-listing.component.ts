import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripDataService, Trip } from '../services/trip-data/trip-data.service';

@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css']
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];

  constructor(
    private tripService: TripDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tripService.getTrips().subscribe({
      next: (data: Trip[]) => {
        this.trips = data;
      },
      error: (err) => {
        console.error('Error fetching trips:', err);
      }
    });
  }

  editTrip(code: string): void {
    this.router.navigate(['/edit-trip', code]);
  }

  deleteTrip(code: string): void {
    if (confirm('Are you sure you want to delete this trip?')) {
      this.tripService.deleteTrip(code).subscribe({
        next: () => {
          this.getTrips();
        },
        error: (err) => {
          console.error('Delete error:', err);
        }
      });
    }
  }

  confirmDelete(code: string): void {
    if (confirm('Are you sure you want to delete this trip?')) {
      this.tripService.deleteTrip(code).subscribe({
        next: () => {
          this.trips = this.trips.filter(t => t.code !== code);
          console.log(`Trip ${code} deleted`);
        },
        error: (err) => {
          console.error('Error deleting trip:', err);
        }
      });
    }
  }

  getTrips(): void {
    this.tripService.getTrips().subscribe({
      next: (data) => {
        this.trips = data;
      },
      error: (err) => {
        console.error('Error fetching trips:', err);
      }
    });
  }

}
