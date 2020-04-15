// TODO: Replace this with the real typings from @types/chart.js once requirejs is no longer used:
// it has problems with loading modules named as '.js', cannot distinguish from .js files

declare module 'chart.js' {
  //TODO: Define more precise typings based on the documentation https://www.chartjs.org/docs/latest/getting-started/usage.html

  export class Chart {
    data: any;
    constructor(renderingContext: CanvasRenderingContext2D, options: any);
    update(duration: number): void;
  }
}