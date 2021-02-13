import { ApiService } from 'app/system/api'

export function appSettingsRequest(params: IAppSettingsRequest): Promise<ISettingsInformation> {
    return ApiService.get(
        'http://localmodx.appsj.su/get-app-settings.json',
        { params }
    )
}

export function townsRequest(params: ITownsRequest): Promise<ITownsResponce> {
    return ApiService.get(
        'http://localmodx.appsj.su/towns.json',
        { params }
    )
}

