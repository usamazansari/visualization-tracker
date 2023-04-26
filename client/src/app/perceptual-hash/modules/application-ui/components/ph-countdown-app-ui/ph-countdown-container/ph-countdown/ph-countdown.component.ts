import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { AppTHEOplayerModel } from '@shared/models/app-theoplayer.model'

@Component({
  selector: 'app-ph-countdown',
  templateUrl: './ph-countdown.component.html',
  styleUrls: ['./ph-countdown.component.scss']
})
export class PhCountDownComponent implements OnInit {

  private _chartData$: BehaviorSubject<any> // create appropriate models, do not use `any`
  bChartData: BehaviorSubject<any> // create appropriate models, do not use `any`
  updateTime: { currentTime: number, autoplay: boolean }
  selectedVideo: any
  quickLinks: any = [];
  changeVideo: AppTHEOplayerModel

  @Input()
  set chartData(value: any) { this._chartData$.next(value) };
  get chartData(): any { return this._chartData$.getValue() };

  @Output() triggerNavigate$: EventEmitter<void>

  constructor() {
    this._chartData$ = new BehaviorSubject<any>(null)

    this.triggerNavigate$ = new EventEmitter<void>()
  }

  ngOnInit(): void {
    this._chartData$.subscribe(_ => {
      if (!!_) {
        this.initializeTHEOplayerData({ chartData: _ })
        this._initializeQuickLinks()
      }
    })
  }

  _initializeQuickLinks() {
    this.quickLinks = []
    for (let i = 0; i < this.chartData.data.length; i++) {

      this.quickLinks.push({ index: i, ...this.chartData.data[i] })
    }
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

  initializeTHEOplayerData(_: { chartData: any }) {
    this.selectedVideo = {
      config: {
        ui: {
          width: '540px',
          height: '200px'
        }
      },
      video: {
        src: _["video_url"],
        timecodeLocation: [],
        type: "video/mp4",
      }
    }
  }

  playVideo(_: number) {
    this.updateTime = {
      currentTime: +_.toFixed(2),
      autoplay: true
    }
  }

  selectGraph(_: any) {
    this.selectedVideo = null
    this.bChartData = _
    var videoObject = {
      src: _["video_url"],
      type: "video/mp4",
      autoplay: true
    }

    this.changeVideo = {
      config: {
        ui: {
          width: '540px',
          height: '200px'
        }
      },
      video: { ...videoObject }
    }
  }

  triggerNavigate(): void {
    this.triggerNavigate$.emit()
  }

}
