import { Component, OnInit, Input, SimpleChanges, Directive, HostListener, EventEmitter, Output } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import * as fromD3 from 'd3'
import { SceneDetectionData, BarChartData } from '@ph-app/models/ph-phash-app-ui/phash.model'


@Component({
  selector: 'app-ph-scene-detection-chart',
  templateUrl: './ph-scene-detection-chart.component.html',
  styleUrls: ['./ph-scene-detection-chart.component.scss']
})
export class PhSceneDetectionChartComponent implements OnInit {

  private _chartData$: BehaviorSubject<SceneDetectionData>

  @Input()
  set bChartData(value: any) { this._chartData$.next(value) };
  get bChartData(): any { return this._chartData$.getValue() };

  @Output() playVideo$: EventEmitter<any>

  private _svg: fromD3.Selection<SVGGElement, unknown, HTMLElement, any>
  private _margin = 20;
  private _width = 580 - (this._margin * 2);
  private _bins = []
  private _height = 180 - (this._margin * 2);
  selectedVideo: any


  constructor() {
    this._chartData$ = new BehaviorSubject<SceneDetectionData>(null)
    this.playVideo$ = new EventEmitter<any>()
  }

  ngOnInit(): void {
  }


  selectVideo(_, $) {
    this.playVideo$.emit($)
    for (let x of this.bChartData["timecode_of_scenes_between_fades"]) {
      if ($.x0 >= x.start && $.x0 <= x.end) {
        this.selectedVideo["time"] = this.toTimeCode(x.start)
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this._triggerGraph(this.bChartData)
  }


  private hmsToSecondsOnly(str) {
    var x = str.split(".")[1]
    var p = str.split(':'),
      s = 0, m = 1

    while (p.length > 0) {
      s += m * parseInt(p.pop(), 10)
      m *= 60
    }
    return +(s + "." + x)
  }

  _createSVG(_?: { x: number, y: number, width: number, height: number }): void {
    if (!fromD3.select('figure#graph1 svg').empty()) fromD3.select('figure#graph1 svg').remove()

    this._svg = fromD3.select('figure#graph1')
      .append('svg')
    if (!!_) this._svg.attr('viewBox', `${_.x} ${_.y} ${_.width} ${_.height}`)

    this._svg.attr('width', this._width + (this._margin * 2))
      .attr('height', this._height + (this._margin * 2))

  }

  _triggerGraph(_: BarChartData[]) {
    this._createSVG()
    const xTotal = this.hmsToSecondsOnly(_['total_duration'])

    // Formatters for counts and times (converting numbers to Dates).
    var formatMinutes = function (totalSecs) {
      var sec_num = parseInt(totalSecs, 10) // don't forget the second param
      var hours: any = Math.floor(sec_num / 3600)
      var minutes: any = Math.floor((sec_num - (hours * 3600)) / 60)
      var seconds: any = sec_num - (hours * 3600) - (minutes * 60)

      if (hours < 10) { hours = "0" + hours }
      if (minutes < 10) { minutes = "0" + minutes }
      if (seconds < 10) { seconds = "0" + seconds }
      return hours + ':' + minutes + ':' + seconds
    }

    var x = fromD3.scaleLinear()
      .domain([0, xTotal])
      .range([0, this._width])

    this._svg.append('g')
      .attr('transform', 'translate(35,' + this._height + ')')
      .call(fromD3.axisBottom(x).tickFormat(formatMinutes))
      .selectAll('text')
      .attr("x", "20px")
      .attr('transform', 'rotate(0)')
      .style("font", "12px times")
      .style("font-weight", "bold")
      .style('text-anchor', 'end')


    var c = []
    _['timecode_of_scenes_between_fades'].forEach(data => {
      var q = this.hmsToSecondsOnly(data.start)
      var e = true
      while (e) {
        c.push(q)
        if (this.hmsToSecondsOnly(data.end) >= q) {
          q += 0.1
        } else {
          e = false
        }
      }
    })

    var histogram = fromD3.histogram()
      .value(function (d) { return d })   // I need to give the vector of value
      .domain([0, xTotal])  // then the domain of the graphic
      .thresholds(x.ticks(xTotal * 3)) // then the numbers of bins

    var bins = histogram(c)

    var Tooltip = fromD3.select("figure#graph1")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style('justify-content', 'center')
      .style('background-color', '#616161e6')
      .style('color', '#fafafa')
      .style('border-radius', '4px')
      .style('padding', '4px 8px')
      .style('font-size', '12px')
      .style('box-shadow', '0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)')
      .style("position", "fixed")

    function hmsToSecondsOnly(str) {
      var x = str.split(".")[1]
      var p = str.split(':'),
        s = 0, m = 1

      while (p.length > 0) {
        s += m * parseInt(p.pop(), 10)
        m *= 60
      }
      return +(s + "." + x)
    }


    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function (d) {
      Tooltip
        .style("opacity", 1)
      fromD3.select(this)
        .style("opacity", 1)
    }
    var mousemove = function (d, $) {
      var a, b
      for (let x of _["timecode_of_scenes_between_fades"]) {
        if ($.x0 >= hmsToSecondsOnly(x.start) && $.x0 <= hmsToSecondsOnly(x.end)) {
          Tooltip
            .html("The Start Time is " + (x.start) + '<br> The End time is ' + (x.end))
            .style('left', function (c) {
              return (d['clientX'] + 20) + 'px'
            })
            .style('top', (d['clientY'] + 20) + 'px')
        }
      }
    }
    var mouseleave = function (d) {
      Tooltip
        .style("opacity", 0)
      fromD3.select(this)
        .style("stroke", "none")
    }

    this._svg.selectAll("rect")
      .data(bins)
      .enter()
      .append("rect")
      .attr("x", 36)
      .attr("y", -181)
      .attr("transform", function (d) { return "translate(" + x(d.x0) + ",201)" })
      .attr("width", function (d) { return (x(d.x1) - x(d.x0) + 1) })
      .attr("height", function (d) {
        if (d.length > 1) { return 120 }
      })
      .style("fill", "green")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
      .on("click", (data, $) => this.playVideo(data, $))


  }

  playVideo = function (d, $) {
    for (let x of this.bChartData["timecode_of_scenes_between_fades"]) {
      if ($.x0 >= this.hmsToSecondsOnly(x.start) && $.x0 <= this.hmsToSecondsOnly(x.end)) {
        this.playVideo$.emit(this.hmsToSecondsOnly(x.start))
      }
    }
    this.selectedVideo = d
  }

  toTimeCode(totalSecs) {
    var ms = <number>(totalSecs.toFixed(2).toString().split(".")[1])
    var sec_num = parseInt(totalSecs, 10) // don't forget the second param
    var hours: any = Math.floor(sec_num / 3600)
    var minutes: any = Math.floor((sec_num - (hours * 3600)) / 60)
    var seconds: any = sec_num - (hours * 3600) - (minutes * 60)

    if (hours < 10) { hours = "0" + hours }
    if (minutes < 10) { minutes = "0" + minutes }
    if (seconds < 10) { seconds = "0" + seconds }
    return hours + ':' + minutes + ':' + seconds + "." + ms
  }

}
