import { Injectable } from '@angular/core'
import { NavigationExtras } from '@angular/router'

import { APP_ROUTES } from 'src/app/app.routes'

import { CORE_ROUTES } from '@cd-core/cd-core.routes'
import { AppRouterService } from '@shared/services/app-router/app-router.service'

@Injectable({
  providedIn: 'root'
})
export class CdCoreService {

  constructor(
    private _routerService: AppRouterService
  ) { }

  navigate(_: { path: string[], extras: NavigationExtras }): void {
    if (_.path.includes(CORE_ROUTES.CONTACT)) this._routerService.navigate({ path: [CORE_ROUTES.CONTACT], extras: {} })
    else if (_.path.includes(CORE_ROUTES.MEDIALAB)) this._routerService.navigate({ path: [APP_ROUTES.EMPTY], extras: {} })
    else this._routerService.navigate({ path: [APP_ROUTES.DEDUPLICATION, ..._.path], extras: { ..._.extras } })
  }
}
