import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyService } from './services/currency.service';
import { formatDate } from '@angular/common';

// Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatListModule,
    MatDividerModule,
    MatIcon
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  converterForm: FormGroup;
  isLoading = false;
  currencies: any[] = [];
  result: number | null = null;
  history: any[] = [];

  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyService
  ) {
    this.converterForm = this.fb.group({
      amount: [1, [Validators.required, Validators.min(0.01)]],
      from: ['USD', Validators.required],
      to: ['EUR', Validators.required],
      date: [null] // Optional historical date
    });
  }

  ngOnInit() {
    this.loadCurrencies();
    this.refreshHistory();
  }

  loadCurrencies() {
    this.isLoading = true;
    this.currencyService.getCurrencies().subscribe({
      next: (res: any) => {
        this.currencies = Object.values(res.data);
        this.isLoading = false;
      },
      error: () => (this.isLoading = false)
    });
  }

  handleConvert() {
    if (this.converterForm.invalid) return;

    const { amount, from, to, date } = this.converterForm.value;
    const formattedDate: string | undefined = date
      ? formatDate(date, 'yyyy-MM-dd', 'en-US')
      : undefined;

    this.isLoading = true;

    this.currencyService.getRates(from, formattedDate).subscribe({
      next: (res: any) => {
        let rate: number | undefined;

        if (formattedDate && res.data[formattedDate]) {
          rate = res.data[formattedDate][to];
        } else {
          rate = res.data[to];
        }

        if (rate) {
          this.result = amount * rate;

          const record = {
            amount,
            from,
            to,
            result: this.result,
            date: formattedDate || 'Latest',
            timestamp: new Date()
          };

          this.currencyService.saveTransaction(record);
          this.refreshHistory();
        } else {
          console.error('Rate not found in response', res);
        }

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Conversion error:', err);
        this.isLoading = false;
      }
    });
  }

  refreshHistory() {
    this.history = this.currencyService.getHistory();
  }
}