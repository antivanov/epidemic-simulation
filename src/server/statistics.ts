import { Metrics } from '../common/common';

export interface DayMetrics {
  healthy: number;
  exposed: number;
  infected: number;
  contagious: number;
  accute: number;
  intensiveCare: number;
  immune: number;
  dead: number;
}

export interface CumulativeDayMetrics {
  cumulativeInfected: number;
}

export interface CumulativeMetrics {
  infected: number
}

export class SimulationStatistics {
  metrics: Array<DayMetrics & CumulativeDayMetrics>;
  cumulativeMetrics: CumulativeMetrics;
  constructor() {
    this.metrics = [];
    this.cumulativeMetrics = {
      infected: 0
    };
  }
  incrementInfected() {
    this.cumulativeMetrics.infected++;
  }
  appendDayMetrics(dayMetrics: DayMetrics) {
    this.metrics.push({
      ...dayMetrics,
      cumulativeInfected: this.cumulativeMetrics.infected
    });
  }
  getLatestDay(): number {
    return this.metrics.length;
  }
  getMetrics(): Metrics {
    const healthy = this.metrics.map(dayMetrics => dayMetrics.healthy);
    const activeCases = this.metrics.map(dayMetrics =>
      dayMetrics.infected + dayMetrics.contagious + dayMetrics.accute + dayMetrics.intensiveCare
    );
    const cumulativeInfected = this.metrics.map(dayMetrics => dayMetrics.cumulativeInfected);
    const immune = this.metrics.map(dayMetrics => dayMetrics.immune);
    const dead = this.metrics.map(dayMetrics => dayMetrics.dead);

    return {
      healthy,
      activeCases,
      cumulativeInfected,
      immune,
      dead
    };
  }
}