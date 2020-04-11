// Using "chart.js" name is problematic because of the usage of requirejs which refuses to understand .js as anything else but file extension
// TODO: Consider using @types/chart.js
// import { Chart } from 'chart.js';

declare module 'chartjs' {
  export class Chart {}
}