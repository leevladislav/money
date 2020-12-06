import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {AnalyticsService} from '../shared/services/analytics.service';
import {Chart} from 'chart.js';
import {AnalyticsPage} from '../shared/interfaces';
import {unsubscribe} from '../utils/unsubscriber';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gain', {static: false}) gainRef: ElementRef;
  @ViewChild('order', {static: false}) orderRef: ElementRef;

  average: number;
  pending = true;

  private subscriptions: Subscription[] = [];

  constructor(private service: AnalyticsService) {
  }

  ngAfterViewInit(): void {
    const gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(255, 99, 132)'
    };

    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(54, 162, 235)'
    };

    const getAnalyticsSub = this.service.getAnalytics()
      .subscribe((data: AnalyticsPage) => {
        this.average = data.average;

        gainConfig.labels = data.chart.map(item => item.label);
        gainConfig.data = data.chart.map(item => item.gain);

        orderConfig.labels = data.chart.map(item => item.label);
        orderConfig.data = data.chart.map(item => item.order);

        const gainCtx = this.gainRef.nativeElement.getContext('2d');
        const orderCtx = this.orderRef.nativeElement.getContext('2d');
        gainCtx.canvas.height = '300px';
        orderCtx.canvas.height = '300px';

        const chartGain = new Chart(gainCtx, createChartConfig(gainConfig));
        const chartOrder = new Chart(orderCtx, createChartConfig(orderConfig));

        this.pending = false;
      });

    this.subscriptions.push(getAnalyticsSub);
  }

  ngOnDestroy(): void {
    unsubscribe(this.subscriptions);
  }
}

function createChartConfig({labels, data, label, color}) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  };
}
